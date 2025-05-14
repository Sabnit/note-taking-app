import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  getCategoryNotesById,
  updateCategory,
} from "../../services/categoryService";

import { categoryKeys, noteKeys } from "./keys";
import { usePrefetchNextPage } from "./usePrefetchNextPage";

/**
 * Custom hook for category CRUD operations
 */

/**
 * Hook for creating a new category
 */
export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (categoryData) => createCategory(categoryData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.lists() });
    },
  });
};

/**
 * Hook for fetching all categories
 */
export const useCategories = () => {
  return useQuery({
    queryKey: categoryKeys.list(),
    queryFn: getCategories,
    keepPreviousData: true,
  });
};

/**
 * Hook for fetching a single category by Id
 * @param {string} id
 * @returns {*}
 */
export const useCategory = (id) => {
  return useQuery({
    queryKey: categoryKeys.detail(id),
    queryFn: () => getCategoryById(id),
    enabled: !!id,
  });
};

/**
 * Hook for fetching category notes by Id with pagination
 * @param {string} id - Category ID
 * @param {Object} options - Pagination and sorting options
 * @returns {*}
 */
export const useCategoryNotes = (id, options = {}) => {
  const paginationOptions = {
    page: options.page || 1,
    limit: options.limit || 10,
    sortBy: options.sortBy || "date",
    order: options.order || "desc",
    ...options,
  };

  return useQuery({
    queryKey: categoryKeys.categoryNotes(id, paginationOptions),
    queryFn: () => getCategoryNotesById(id, paginationOptions),
    enabled: !!id,
    keepPreviousData: true,
  });
};

/**
 * Hook for updating an existing category
 */
export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateCategory(id, data),
    onSuccess: (data, variables) => {
      const categoryId = data.data.id;

      // Update the cache for the specific updated note
      queryClient.setQueryData(categoryKeys.detail(variables.id), data);

      // Invalidate and refetch categories
      queryClient.invalidateQueries({ queryKey: categoryKeys.lists() });

      // Invalidate category data by id and refetch updated category data for that id
      queryClient.invalidateQueries({
        queryKey: categoryKeys.detail(categoryId),
      });
    },
  });
};

/**
 * Hook for deleting a category
 */
export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }) => deleteCategory(id),
    onSuccess: (_, id) => {
      // Remove the category list by id
      queryClient.removeQueries({ queryKey: categoryKeys.detail(id) });

      // Invalidate and refetch new category list
      queryClient.invalidateQueries({ queryKey: categoryKeys.lists() });

      // Invalidate and refetch new note list
      queryClient.invalidateQueries({ queryKey: noteKeys.lists() });
    },
  });
};

/**
 * Hook for prefetching the next page of notes in a category
 * @param {Object} params - Prefetch parameters
 * @param {string} params.categoryId - Category ID
 * @param {Object} params.currentOptions - Current pagination options
 * @param {any} params.data - Current data from useCategoryNotes
 */
export const usePrefetchNextCategoryNotes = ({
  categoryId,
  currentOptions,
  data,
}) => {
  return usePrefetchNextPage({
    currentOptions,
    data,
    getQueryKey: (options) => categoryKeys.categoryNotes(categoryId, options),
    fetchFn: (options) => getCategoryNotesById(categoryId, options),
    enabled: !!categoryId,
  });
};
