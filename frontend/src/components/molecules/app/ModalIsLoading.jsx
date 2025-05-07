import React from "react";

const ModalIsLoading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative z-10 bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </div>
    </div>
  );
};

export default ModalIsLoading;
