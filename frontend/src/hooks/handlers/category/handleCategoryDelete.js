import { showToast } from "../../../utils/toast";
import { CLIENT_ROUTES } from "../../../constants/clientRoutes";

/**
 *Handles deleting existing category name
 * @param {Object} params
 * @param {Object} params.deleteCategoryMutation
 * @param {number} params.selectedCategoryId
 * @param {Function} [params.closeModal] - Optional
 * @param {Function} params.navigate - react-router-dom's navigate function
 */
export const handleCategoryDelete = ({
  deleteCategoryMutation,
  selectedCategoryId,
  closeModal,
  navigate,
}) => {
  deleteCategoryMutation.mutate(
    { id: selectedCategoryId },
    {
      onSuccess: () => {
        showToast.success("Category deleted successfully");
        navigate(CLIENT_ROUTES.APP_ROUTE.NOTES);

        if (typeof closeModal === "function") {
          closeModal();
        }
      },
    }
  );
};
