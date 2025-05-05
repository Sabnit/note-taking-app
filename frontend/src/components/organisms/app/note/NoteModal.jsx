import { useState, useEffect, useRef } from "react";
import { Fragment, useContext } from "react";
import { Hash, Search, X } from "lucide-react";

import {
  useCreateNote,
  useDeleteNote,
  useNote,
  useUpdateNote,
} from "../../../../hooks/query/useNotes";
import { AppContext } from "../../../../context/AppContext";
import { useCategories } from "../../../../hooks/query/useCategories";
import ConfirmationDialog from "../../../molecules/app/ConfirmationDialog";
import { useLocation, useParams } from "react-router-dom";
import NoteIsLoading from "../../../molecules/app/NoteIsLoading";
import { ERROR_MESSAGES } from "../../../../constants/errorMessages";
import FormField from "../../../molecules/FormField";
import { validateNoteForm } from "../../../../utils/formValidator";
import { toast } from "react-toastify";

const NoteModal = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    categoryIds: [],
  });

  // Store original data to compare for changes
  const [originalData, setOriginalData] = useState(null);

  // State for confirmation dialog
  const [showConfirmation, setShowConfirmation] = useState(false);

  // State for category search and dropdown
  const [categorySearch, setCategorySearch] = useState("");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const inputRef = useRef(null);
  const location = useLocation();
  const params = useParams();
  const categorySearchRef = useRef(null);
  const categoryDropdownRef = useRef(null);

  // Initializing mutations
  const createNoteMutation = useCreateNote();
  const updateNoteMutation = useUpdateNote();
  const deleteNoteMutation = useDeleteNote();

  // Fetch the categories list
  const { data: categoriesData, isLoading: categoriesLoading } =
    useCategories();

  const {
    isAddNoteModalOpen,
    setIsAddNoteModalOpen,
    selectedNoteId,
    setSelectedNoteId,
  } = useContext(AppContext);

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

  if (
    isAddNoteModalOpen &&
    (categoriesLoading || (isEditMode && noteLoading))
  ) {
    return <NoteIsLoading />;
  }

  if (!isAddNoteModalOpen) {
    return null;
  }

  const categories = categoriesData?.categories || [];

  // Map to quickly look up categories by ID
  const categoryMap = categories.reduce((acc, category) => {
    if (!category) return;

    acc[category.id] = category.title;
    return acc;
  }, {});

  // Filter categories based on search
  const filteredCategories = categories.filter((category) =>
    category.title.toLowerCase().includes(categorySearch.toLowerCase())
  );

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
    // If there are changes and in edit mode, show confirmation dialog
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

  const handleRemoveCategory = (categoryId) => {
    setFormData((prev) => ({
      ...prev,
      categoryIds: prev.categoryIds.filter((id) => id !== categoryId),
    }));
  };

  const handleDelete = () => {
    if (location.pathname.includes("/app/category/")) {
      deleteNoteMutation.mutate(
        {
          noteId: selectedNoteId,
          categoryId: params.id,
        },
        {
          onSettled: () => {
            toast.success("Note deleted successfully");
            closeModal();
          },
        }
      );
    } else {
      deleteNoteMutation.mutate(
        {
          noteId: selectedNoteId,
          categoryId: null,
        },
        {
          onSettled: () => {
            toast.success("Note deleted successfully");
            closeModal();
          },
        }
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateNoteForm(formData)) return;

    // For old notes
    if (isEditMode) {
      // Only include fields that have changed
      const changedData = {};

      // Compare each field with original data
      if (formData.title !== originalData.title) {
        changedData.title = formData.title;
      }

      if (formData.description !== originalData.description) {
        changedData.description = formData.description;
      }

      if (formData.date !== originalData.date) {
        changedData.date = formData.date;
      }

      // Compare each category ids
      if (
        JSON.stringify(formData.categoryIds.sort()) !==
        JSON.stringify(originalData.categoryIds.sort())
      ) {
        changedData.categoryIds = formData.categoryIds;
      }

      // Only update if there are actual changes
      if (Object.keys(changedData).length > 0) {
        if (location.pathname.includes("/app/category/")) {
          updateNoteMutation.mutate(
            { id: selectedNoteId, data: changedData, categoryId: params.id },
            {
              onSuccess: () => {
                closeModal();
              },
            }
          );
        } else {
          updateNoteMutation.mutate(
            { id: selectedNoteId, data: changedData },
            {
              onSuccess: () => {
                closeModal();
              },
            }
          );
        }
      } else {
        // No changes, just close the modal
        closeModal();
      }
    } else {
      // For new notes
      if (location.pathname.includes("/app/category/")) {
        createNoteMutation.mutate(
          { noteData: formData, categoryId: params.id },
          {
            onSuccess: () => {
              closeModal();
            },
          }
        );
      } else {
        createNoteMutation.mutate(
          { noteData: formData },
          {
            onSuccess: () => {
              closeModal();
            },
          }
        );
      }
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
                <div className="flex flex-wrap items-center gap-2 mt-3">
                  {formData.categoryIds.map((categoryId) => (
                    <div
                      key={categoryId}
                      className="flex items-center gap-1 bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-sm"
                    >
                      <Hash size={14} className="text-blue-500" />
                      <span>{categoryMap[categoryId]}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveCategory(categoryId)}
                        className="ml-1 text-gray-500 hover:text-gray-700"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Category Search and Selection */}
            <div className="flex flex-col p-4 border-t border-neutral-100">
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
                            formData.categoryIds.includes(category.id)
                              ? "bg-gray-50"
                              : ""
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

              <div className="flex justify-between gap-2">
                <div>
                  {isEditMode && (
                    <button
                      type="button"
                      onClick={handleDelete}
                      className="px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={deleteNoteMutation.isPending}
                    >
                      {deleteNoteMutation.isPending ? "Deleting..." : "Delete"}
                    </button>
                  )}
                </div>

                <div>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="h-9 px-4 text-neutral-600 rounded-md text-sm font-medium hover:bg-neutral-50 cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="h-9 px-4 bg-[#f1c98b] hover:bg-[#e2bc82] text-white rounded-md text-sm font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={
                      isEditMode
                        ? !hasChanges() || updateNoteMutation.isPending
                        : createNoteMutation.isPending
                    }
                  >
                    {isEditMode
                      ? updateNoteMutation.isPending
                        ? "Updating..."
                        : "Update note"
                      : createNoteMutation.isPending
                      ? "Adding..."
                      : "Add note"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NoteModal;
