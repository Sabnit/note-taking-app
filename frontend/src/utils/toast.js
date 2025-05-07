import { toast } from "react-toastify";

export const showToast = {
  error: (message) => {
    toast.error(message || "Something went wrong");
  },

  success: (message) => {
    toast.success(message || "Operation successful");
  },
  info: (message) => {
    toast.info(message || "Information");
  },
};
