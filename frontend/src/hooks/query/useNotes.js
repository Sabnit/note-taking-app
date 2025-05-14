import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createNote,
  deleteNote,
  getNoteById,
  getNotes,
  updateNote,
} from "../../services/noteService";

import { categoryKeys, noteKeys } from "./keys";
import { usePrefetchNextPage } from "./usePrefetchNextPage";

/**
 * Custom hook for notes CRUD operations
 */

/**
 * Hook for creating a new note
 */
export const useCreateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ noteData }) => createNote(noteData),
    onSuccess: (data) => {
      const { categories } = data.data;

      // Invalidate note list and refetch the updated list
      queryClient.invalidateQueries({ queryKey: noteKeys.lists() });

      // Invalidate category list and refetch the updated list
      categories.forEach((category) => {
        const { id } = category;
        const idStr = id.toString();
        queryClient.invalidateQueries({
          queryKey: categoryKeys.categoryNotes(idStr, {}),
        });
      });
    },
  });
};

/**
 * Hook for fetching the data of note by Id
 * @param {string} id
 * @returns {*}
 */
export const useNote = (id) => {
  return useQuery({
    queryKey: noteKeys.detail(id),
    queryFn: () => getNoteById(id),
    enabled: !!id,
  });
};

/**
 * Hook for fetching all notes with pagination and sorting
 * @param {Object} options - Pagination and sorting options
 */
export const useNotes = (options = {}) => {
  const paginationOptions = {
    page: options.page || 1,
    limit: options.limit || 4,
    sortBy: options.sortBy || "date",
    order: options.order || "desc",
    ...options,
  };

  return useQuery({
    queryKey: noteKeys.list(paginationOptions),
    queryFn: () => getNotes(paginationOptions),
    keepPreviousData: true,
  });
};

/**
 * Hook for updating an existing note
 */
export const useUpdateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateNote(id, data),
    onSuccess: (data, variables) => {
      const { id: noteId } = data.updatedNote;
      const { categoryIds } = variables;

      // Invalidate the note list and refetch the updated list
      queryClient.invalidateQueries({ queryKey: noteKeys.lists() });

      // Update the note id with updated details
      queryClient.setQueryData(noteKeys.detail(noteId), data);

      // Invalidate previous note id details and refetch updated details
      queryClient.invalidateQueries({
        queryKey: noteKeys.detail(noteId),
      });

      // Invalidate individual category's note list and refetch the updated list
      categoryIds.forEach((id) => {
        const idStr = id.toString();
        queryClient.invalidateQueries({
          queryKey: categoryKeys.categoryNotes(idStr, {}),
        });
      });
    },
  });
};

/**
 * Hook for deleting a note
 */
export const useDeleteNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ noteId }) => {
      return deleteNote(noteId);
    },
    onSuccess: (data) => {
      const { note } = data;
      const { id: noteId, categories } = note;

      // Remove the note from the query
      queryClient.removeQueries({ queryKey: noteKeys.detail(noteId) });

      // Invalidate the note list and refetch new list
      queryClient.invalidateQueries({ queryKey: noteKeys.lists() });

      // Invalidate individual category's note list and refetch the updated list
      categories.forEach((category) => {
        const { id } = category;
        const idStr = id.toString();
        queryClient.invalidateQueries({
          queryKey: categoryKeys.categoryNotes(idStr, {}),
        });
      });
    },
  });
};

/**
 * Hook for prefetching the next page of notes
 * @param {Object} params - Prefetch parameters
 * @param {Object} params.currentOptions - Current pagination options
 * @param {any} params.data - Current data from useNotes
 */
export const usePrefetchNextNotes = ({ currentOptions, data }) => {
  return usePrefetchNextPage({
    currentOptions,
    data,
    getQueryKey: (options) => noteKeys.list(options),
    fetchFn: (options) => getNotes(options),
  });
};
