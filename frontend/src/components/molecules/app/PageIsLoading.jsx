import React from "react";
import { ClipLoader } from "react-spinners";

const PageIsLoading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <ClipLoader size={100} />
    </div>
  );
};

export default PageIsLoading;
