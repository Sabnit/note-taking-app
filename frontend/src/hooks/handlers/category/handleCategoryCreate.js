import { showToast } from "../../../utils/toast";

/**
 * Handles creation of new category
 * @param {Object} params
 * @param {import('@tanstack/react-query').UseMutationResult} params.createCategoryMutation
 * @param {Object} params.formData
 * @param {Function} params.closeModal
 */
export const handleCategoryCreate = ({
  createCategoryMutation,
  formData,
  closeModal,
}) => {
  createCategoryMutation.mutate(
    { categoryData: formData },
    {
      onSuccess: () => {
        showToast.success("Category created successfully");
        closeModal();
      },
    }
  );
};
