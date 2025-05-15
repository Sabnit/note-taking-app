import React, { useContext, useEffect, useRef, useState } from "react";

import ModalIsLoading from "../../../molecules/ModalIsLoading";
import ConfirmationDialog from "../../../molecules/ConfirmationDialog";

import { validateCategoryForm } from "../../../../utils/formValidator";

import {
  useCategory,
  useCreateCategory,
  useDeleteCategory,
  useUpdateCategory,
} from "../../../../hooks/query/useCategories";
import { CategoryContext } from "../../../../context/CategoryContext";
import { handleCategoryUpdate } from "../../../../hooks/handlers/category/handleCategoryUpdate";
import { handleCategoryCreate } from "../../../../hooks/handlers/category/handleCategoryCreate";
import ModalActionButtons from "../../../molecules/ModalActionButtons";
import { handleCategoryDelete } from "../../../../hooks/handlers/category/handleCategoryDelete";
import { useNavigate } from "react-router-dom";

const CategoryModal = () => {
  const [formData, setFormData] = useState({
    title: "",
  });
  const [originalData, setOriginalData] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const inputRef = useRef(null);

  const navigate = useNavigate();

  const {
    selectedCategoryId,
    isAddCategoryModalOpen,
    setIsAddCategoryModalOpen,
    setSelectedCategoryId,
  } = useContext(CategoryContext);

  const createCategoryMutation = useCreateCategory();
  const updateCategoryMutation = useUpdateCategory();
  const deleteCategoryMutation = useDeleteCategory();

  const { data: categoryData, isLoading: categoryLoading } = useCategory(
    selectedCategoryId,
    {
      enabled: !!selectedCategoryId && isAddCategoryModalOpen,
    }
  );

  const isEditMode = !!selectedCategoryId;

  useEffect(() => {
    if (categoryData && isEditMode) {
      const formattedData = {
        title: categoryData.data.title || "",
      };

      setFormData(formattedData);
      setOriginalData(formattedData);
    }
  }, [categoryData, isEditMode]);

  useEffect(() => {
    if (isAddCategoryModalOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isAddCategoryModalOpen]);

  if (isAddCategoryModalOpen && categoryLoading) {
    return <ModalIsLoading />;
  }

  // Check if form has been modified from original data
  const hasChanges = () => {
    if (!originalData || !isEditMode) return true;
    return formData.title !== originalData.title;
  };

  const handleClose = () => {
    if (isEditMode && hasChanges()) {
      setShowConfirmation(true);
    } else {
      closeModal();
    }
  };

  const closeModal = () => {
    setFormData({ title: "" });
    setOriginalData(null);
    setShowConfirmation(false);
    setSelectedCategoryId(null);
    setIsAddCategoryModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = () => {
    handleCategoryDelete({
      deleteCategoryMutation,
      navigate,
      selectedCategoryId,
      closeModal,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateCategoryForm(formData)) return;

    if (isEditMode) {
      const changedData = {};

      // Compare each field with original data
      if (formData.title !== originalData.title) {
        changedData.title = formData.title;
      }

      // Only update if there are actual changes
      if (Object.keys(changedData).length > 0) {
        handleCategoryUpdate({
          updateCategoryMutation,
          selectedCategoryId,
          changedData,
          closeModal,
        });
      } else {
        closeModal();
      }
    }
    // Create new category
    else {
      handleCategoryCreate({ createCategoryMutation, closeModal, formData });
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
            <div className="p-4 pb-5">
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
            </div>

            <div className="p-4 border-t border-neutral-100">
              <ModalActionButtons
                isEditMode={isEditMode}
                hasChanges={hasChanges}
                handleClose={handleClose}
                handleDelete={handleDelete}
                createMutation={createCategoryMutation}
                updateMutation={updateCategoryMutation}
                deleteMutation={deleteCategoryMutation}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CategoryModal;
