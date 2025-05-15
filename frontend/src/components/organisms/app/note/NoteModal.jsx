import React, { useState, useEffect, useRef } from "react";
import { useContext } from "react";
import { Hash, Search, X } from "lucide-react";

import IconButton from "../../../atoms/IconButton";
import ModalIsLoading from "../../../molecules/ModalIsLoading";
import ConfirmationDialog from "../../../molecules/ConfirmationDialog";

import { validateNoteForm } from "../../../../utils/formValidator";

import { NoteContext } from "../../../../context/NoteContext";

import { useCategories } from "../../../../hooks/query/useCategories";
import {
  useCreateNote,
  useDeleteNote,
  useNote,
  useUpdateNote,
} from "../../../../hooks/query/useNotes";
import ModalActionButtons from "../../../molecules/ModalActionButtons";
import { handleNoteDelete } from "../../../../hooks/handlers/note/handleNoteDelete";
import { handleNoteUpdate } from "../../../../hooks/handlers/note/handleNoteUpdate";
import { handleNoteCreate } from "../../../../hooks/handlers/note/handleNoteCreate";
import { formDataChanges } from "../../../../utils/noteFormDataChanges";

const NoteModal = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    categoryIds: [],
  });
  const [originalData, setOriginalData] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [categorySearch, setCategorySearch] = useState("");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const inputRef = useRef(null);

  const {
    isAddNoteModalOpen,
    setIsAddNoteModalOpen,
    selectedNoteId,
    setSelectedNoteId,
  } = useContext(NoteContext);

  // Initializing mutations
  const createNoteMutation = useCreateNote();
  const updateNoteMutation = useUpdateNote();
  const deleteNoteMutation = useDeleteNote();

  // Fetch the categories list
  const { data: categoriesData, isLoading: categoriesLoading } =
    useCategories();

  // Fetch the note data if we're in edit mode
  const { data: noteData, isLoading: noteLoading } = useNote(selectedNoteId, {
    enabled: !!selectedNoteId && isAddNoteModalOpen,
  });

  // Determine if we're in edit mode
  const isEditMode = !!selectedNoteId;

  // Load note data when in edit mode
  useEffect(() => {
    if (noteData && isEditMode) {
      const formattedData = {
        title: noteData.note.title || "",
        description: noteData.note.description || "",
        date: noteData.note.date.split("T")[0] || "",
        categoryIds: noteData.note.categories?.map((cat) => cat.id) || [],
      };

      setFormData(formattedData);
      setOriginalData(formattedData);
    }
  }, [noteData, isEditMode]);

  // Reset form data when modal closes
  useEffect(() => {
    if (!isAddNoteModalOpen) {
      setFormData({ title: "", description: "", date: "", categoryIds: [] });
      setOriginalData(null);
      setCategorySearch("");
      setShowCategoryDropdown(false);
    }
  }, [isAddNoteModalOpen]);

  // Focus on title input when modal opens
  useEffect(() => {
    if (isAddNoteModalOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
  }, [isAddNoteModalOpen]);

  if (
    isAddNoteModalOpen &&
    (categoriesLoading || (isEditMode && noteLoading))
  ) {
    return <ModalIsLoading />;
  }

  if (!isAddNoteModalOpen) {
    return null;
  }

  const categories = categoriesData?.categories || [];

  // Check if form has been modified from original data
  const hasChanges = () => {
    if (!originalData || !isEditMode) return true; // Always enable button in create mode

    return (
      formData.title !== originalData.title ||
      formData.description !== originalData.description ||
      formData.date !== originalData.date ||
      JSON.stringify(formData.categoryIds.sort()) !==
        JSON.stringify(originalData.categoryIds.sort())
    );
  };

  const handleClose = () => {
    if (isEditMode && hasChanges()) {
      setShowConfirmation(true);
    } else {
      closeModal();
    }
  };

  const closeModal = () => {
    setFormData({ title: "", description: "", date: "", categoryIds: [] });
    setOriginalData(null);
    setSelectedNoteId(null);
    setIsAddNoteModalOpen(false);
    setShowConfirmation(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = () => {
    handleNoteDelete({
      selectedNoteId,
      deleteNoteMutation,
      closeModal,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateNoteForm(formData)) return;

    // For old notes
    if (isEditMode) {
      // Only include fields that have changed
      const changedData = formDataChanges({ formData, originalData });

      // Only update if there are actual changes
      if (Object.keys(changedData).length > 0) {
        // Check for category changes
        let categoryIds = null;
        if ("categoryIds" in changedData) {
          categoryIds = [
            ...new Set([
              ...originalData.categoryIds,
              ...changedData.categoryIds,
            ]),
          ];
        } else {
          categoryIds = originalData.categoryIds;
        }

        handleNoteUpdate({
          selectedNoteId,
          categoryIds,
          changedData,
          updateNoteMutation,
          closeModal,
        });
      } else {
        closeModal();
      }
    } else {
      // Create new note
      handleNoteCreate({ createNoteMutation, formData, closeModal });
    }
  };

  return (
    <>
      {showConfirmation && (
        <ConfirmationDialog
          onCancel={() => setShowConfirmation(false)}
          onDiscard={closeModal}
        />
      )}

      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-black/20"
          onClick={handleClose}
          aria-hidden="true"
        />

        {/* Modal */}
        <div className="relative bottom-10 z-10 w-full max-w-2xl bg-white rounded-lg shadow-lg h-fit">
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="p-4 pb-0">
              <div className="space-y-3">
                {/* Title Field */}
                <input
                  ref={inputRef}
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Title"
                  className="w-full text-lg font-medium text-neutral-800 outline-none border-none placeholder:text-neutral-400"
                />

                {/* Description Field */}
                <textarea
                  rows={5}
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full text-neutral-600 outline-none border-none placeholder:text-neutral-400"
                />
              </div>

              {/* Date Field */}
              <input
                className="h-8 px-3 text-neutral-600 border border-neutral-200 rounded-md flex items-center text-sm font-medium hover:bg-neutral-50 cursor-pointer"
                type="date"
                name="date"
                id="date"
                value={formData.date}
                onChange={handleChange}
              />

              {/* Selected Categories Tags */}
              {formData.categoryIds.length > 0 && (
                <SelectedCategories
                  categories={categories}
                  formData={formData}
                  setFormData={setFormData}
                />
              )}
            </div>

            <div className="flex flex-col p-4 border-t border-neutral-100">
              <CategorySelection
                categories={categories}
                categorySearch={categorySearch}
                formData={formData}
                setCategorySearch={setCategorySearch}
                setFormData={setFormData}
                setShowCategoryDropdown={setShowCategoryDropdown}
                showCategoryDropdown={showCategoryDropdown}
              />

              <ModalActionButtons
                isEditMode={isEditMode}
                handleDelete={handleDelete}
                handleClose={handleClose}
                hasChanges={hasChanges}
                createMutation={createNoteMutation}
                deleteMutation={deleteNoteMutation}
                updateMutation={updateNoteMutation}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NoteModal;

/**
 * Display selected categories
 * @param {Object} props
 * @param {Object} props.formData
 * @param {(data: Object) => void} props.setFormData
 * @param {Array<Object>} props.categories
 * @returns {React.JSX.Element}
 */
const SelectedCategories = ({ formData, setFormData, categories }) => {
  const handleRemoveSelectedCategory = (categoryId) => {
    setFormData((prev) => ({
      ...prev,
      categoryIds: prev.categoryIds.filter((id) => id !== categoryId),
    }));
  };

  // Filter out selected category
  const categoryMap = categories.reduce((acc, category) => {
    if (!category) return;

    acc[category.id] = category.title;
    return acc;
  }, {});

  return (
    <div className="flex flex-wrap items-center gap-2 mt-3">
      {formData.categoryIds.map((categoryId) => (
        <div
          key={categoryId}
          className="flex items-center gap-1 bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-sm"
        >
          <Hash size={15} className="text-blue-500" />
          <span>{categoryMap[categoryId]}</span>
          <IconButton
            className="pt-1"
            onClick={() => handleRemoveSelectedCategory(categoryId)}
          >
            <X size={15} />
          </IconButton>
        </div>
      ))}
    </div>
  );
};

/**
 *
 * @param {Object} props
 * @param {Array<Object>} props.categories
 * @param {Object} props.formData
 * @param {(data: Object) => void} props.setFormData
 * @param {string} props.categorySearch
 * @param {(value: string) => void} props.setCategorySearch
 * @param {boolean} props.showCategoryDropdown
 * @param {(value: boolean) => void} props.setShowCategoryDropdown
 * @returns {React.JSX.Element}
 */
const CategorySelection = ({
  categories,
  formData,
  setFormData,
  categorySearch,
  setCategorySearch,
  showCategoryDropdown,
  setShowCategoryDropdown,
}) => {
  const categorySearchRef = useRef(null);
  const categoryDropdownRef = useRef(null);

  // Filter categories based on search
  const filteredCategories = categories.filter((category) =>
    category.title.toLowerCase().includes(categorySearch.toLowerCase())
  );

  const handleCategoryToggle = (categoryId) => {
    if (formData.categoryIds.includes(categoryId)) {
      setFormData((prev) => ({
        ...prev,
        categoryIds: prev.categoryIds.filter((id) => id !== categoryId),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        categoryIds: [...prev.categoryIds, categoryId],
      }));
    }
  };

  // Close category dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(event.target) &&
        categorySearchRef.current &&
        !categorySearchRef.current.contains(event.target)
      ) {
        setShowCategoryDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative mb-3">
      <div
        className="flex items-center border border-neutral-200 rounded-md px-2 py-1"
        onClick={() => setShowCategoryDropdown(true)}
        ref={categorySearchRef}
      >
        <Search size={16} className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search categories..."
          value={categorySearch}
          onChange={(e) => setCategorySearch(e.target.value)}
          className="flex-1 outline-none text-sm"
          onFocus={() => setShowCategoryDropdown(true)}
        />
      </div>

      {showCategoryDropdown && (
        <div
          ref={categoryDropdownRef}
          className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto"
        >
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <div
                key={category.id}
                className={`flex items-center px-3 py-2 cursor-pointer hover:bg-gray-50 ${
                  formData.categoryIds.includes(category.id) ? "bg-gray-50" : ""
                }`}
                onClick={() => handleCategoryToggle(category.id)}
              >
                <input
                  type="checkbox"
                  id={`dropdown-category-${category.id}`}
                  checked={formData.categoryIds.includes(category.id)}
                  onChange={() => {}}
                  className="mr-2"
                />
                <label
                  htmlFor={`dropdown-category-${category.id}`}
                  className="flex-1 cursor-pointer text-sm"
                >
                  {category.title}
                </label>
              </div>
            ))
          ) : (
            <div className="px-3 py-2 text-sm text-gray-500">
              No categories found
            </div>
          )}
        </div>
      )}
    </div>
  );
};
