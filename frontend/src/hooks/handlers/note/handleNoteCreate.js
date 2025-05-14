import { showToast } from "../../../utils/toast";

/**
 * Handles creation of new note
 * @param {Object} params
 * @param {Object} params.createNoteMutation
 * @param {Object} params.formData
 * @param {Function} params.closeModal
 */
export const handleNoteCreate = ({
  createNoteMutation,
  formData,
  closeModal,
}) => {
  createNoteMutation.mutate(
    { noteData: formData },
    {
      onSuccess: () => {
        showToast.success("Note created successfully");
        closeModal();
      },
    }
  );
};
