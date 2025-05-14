import { showToast } from "../../../utils/toast";

/**
 * Handles updating existing note
 * @param {Object} params
 * @param {number} params.selectedNoteId
 * @param {Array} params.categoryIds
 * @param {Object} params.changedData
 * @param {Object} params.updateNoteMutation
 * @param {Function} params.closeModal
 */
export const handleNoteUpdate = ({
  selectedNoteId,
  categoryIds,
  changedData,
  updateNoteMutation,
  closeModal,
}) => {
  updateNoteMutation.mutate(
    { id: selectedNoteId, data: changedData, categoryIds },
    {
      onSuccess: () => {
        showToast.success("Note updated successfully");
        closeModal();
      },
    }
  );
};
