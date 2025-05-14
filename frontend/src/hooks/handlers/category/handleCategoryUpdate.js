import { showToast } from "../../../utils/toast";

/**
 *Handles updating existing category name
 * @param {Object} params
 * @param {import('@tanstack/react-query').UseMutationResult} params.updateCategoryMutation
 * @param {number} params.selectedCategoryId
 * @param {Object} params.changedData
 * @param {Function} params.closeModal
 */
export const handleCategoryUpdate = ({
  updateCategoryMutation,
  selectedCategoryId,
  changedData,
  closeModal,
}) => {
  updateCategoryMutation.mutate(
    { id: selectedCategoryId, data: changedData },
    {
      onSuccess: () => {
        showToast.success("Category updated successfully");
        closeModal();
      },
    }
  );
};
