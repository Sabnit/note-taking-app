import React, { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import Button from "../../../atoms/Button";
import ModalIsLoading from "../../../molecules/app/ModalIsLoading";
import ConfirmationDialog from "../../../molecules/app/ConfirmationDialog";

import { AppContext } from "../../../../context/AppContext";

import { ERROR_MESSAGES } from "../../../../constants/errorMessages";

import { validateCategoryForm } from "../../../../utils/formValidator";

import {
  useCategory,
  useCreateCategory,
  useUpdateCategory,
} from "../../../../hooks/query/useCategories";

const CategoryModal = () => {
  const [formData, setFormData] = useState({
    title: "",
  });

  // Store original data to compare for changes
  const [originalData, setOriginalData] = useState(null);

  // State for confirmation dialog
  const [showConfirmation, setShowConfirmation] = useState(false);

  const inputRef = useRef(null);
  const createCategoryMutation = useCreateCategory();
  const updateCategoryMutation = useUpdateCategory();

  const {
    selectedCategoryId,
    isAddCategoryModalOpen,
    setIsAddCategoryModalOpen,
    setSelectedCategoryId,
  } = useContext(AppContext);

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
        updateCategoryMutation.mutate(
          { id: selectedCategoryId, data: changedData },
          {
            onSuccess: () => {
              toast.success("Category updated successfully");
              closeModal();
            },
            onError: (error) => {
              console.log(error);
              toast.error(error.message || "Failed to update category");
            },
          }
        );
      } else {
        closeModal();
      }
    } else {
      createCategoryMutation.mutate(
        { categoryData: formData },
        {
          onSuccess: () => {
            toast.success("Category created successfully");
            closeModal();
          },
          onError: (error) => {
            toast.error(error.message || "Failed to create category");
          },
        }
      );
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

            <div className="flex items-center justify-end p-4 border-t border-neutral-100">
              <div className="flex gap-2">
                <Button onClick={handleClose} variant="danger">
                  {" "}
                  Cancel
                </Button>

                <Button
                  type="submit"
                  disabled={
                    isEditMode
                      ? !hasChanges() || updateCategoryMutation.isPending
                      : createCategoryMutation.isPending
                  }
                >
                  {isEditMode
                    ? updateCategoryMutation.isPending
                      ? "Updating..."
                      : "Update category"
                    : createCategoryMutation.isPending
                    ? "Adding..."
                    : "Add category"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CategoryModal;
