import React from "react";

import Button from "../atoms/Button";

const ConfirmationDialog = ({ onCancel, onDiscard }) => {
  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
        <h3 className="text-lg font-medium mb-4">Unsaved Changes</h3>
        <p className="mb-6">
          You have unsaved changes. Are you sure you want to cancel?
        </p>
        <div className="flex justify-end gap-3">
          <Button
            variant="secondary"
            className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded"
            onClick={onCancel}
          >
            Continue editing
          </Button>
          <Button variant="danger" onClick={onDiscard}>
            Discard changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
