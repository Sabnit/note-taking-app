import React from "react";
import Button from "../atoms/Button";

/**
 * Component that renders action buttons for a modal dialog
 * Cancel and Add buttons for new item
 * Delete, Cancel, Update for old item
 * @param {Object} props
 * @param {boolean} props.isEditMode - Whether the modal is in edit mode
 * @param {()=> void} props.handleDelete - Function to handle delete action
 * @param {()=> void} props.handleClose - Function to handle close action
 * @param {()=> boolean} props.hasChanges - Function that returns whether there are unsaved changes or not
 * @param {Object} props.createMutation - Create mutation object to create new item
 * @param {Object} props.updateMutation - Update mutation object to update existing item
 * @param {Object} props.deleteMutation - Delete mutation object to delete existing item
 * @returns {React.JSX.Element} Modal action buttons component
 */
const ModalActionButtons = ({
  isEditMode,
  handleDelete,
  handleClose,
  hasChanges,
  createMutation,
  updateMutation,
  deleteMutation,
}) => {
  return (
    <div className="flex justify-between gap-2">
      <div>
        {isEditMode && (
          <Button
            onClick={handleDelete}
            variant="danger"
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? "Deleting..." : "Delete"}
          </Button>
        )}
      </div>

      <div className="flex gap-2">
        <Button type="button" variant="danger" onClick={handleClose}>
          Cancel
        </Button>

        <Button
          type="submit"
          disabled={
            isEditMode
              ? !hasChanges() || updateMutation.isPending
              : createMutation.isPending
          }
        >
          {isEditMode
            ? updateMutation.isPending
              ? "Updating..."
              : "Update "
            : createMutation.isPending
            ? "Adding..."
            : "Add"}
        </Button>
      </div>
    </div>
  );
};

export default ModalActionButtons;
