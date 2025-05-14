import { showToast } from "../../../utils/toast";
import { CLIENT_ROUTES } from "../../../constants/clientRoutes";

/**
 * Handles deleting existing note
 * @param {Object} params
 * @param {Object} params.deleteNoteMutation
 * @param {number} params.selectedNoteId
 * @param {number} params.categoryId
 * @param {Function} params.closeModal
 */
export const handleNoteDelete = ({
  selectedNoteId,
  categoryId,
  deleteNoteMutation,
  closeModal,
}) => {
  deleteNoteMutation.mutate(
    {
      noteId: selectedNoteId,
      categoryId: categoryId,
    },
    {
      onSettled: () => {
        showToast.success("Note deleted successfully");
        closeModal();
      },
    }
  );
};
