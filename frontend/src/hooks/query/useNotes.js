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
 * Hook for fetching a single note by Id
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
 * Hook for creating a new note
 */
export const useCreateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ noteData, categoryId }) => createNote(noteData),
    onSuccess: (_, { noteData, categoryId }) => {
      // Invalidate and refetch the list query
      queryClient.invalidateQueries({ queryKey: noteKeys.lists() });
      if (categoryId) {
        queryClient.invalidateQueries({
          queryKey: categoryKeys.categoryNotes(categoryId, {}),
        });
      }
    },
  });
};

/**
 * Hook for updating an existing note
 */
export const useUpdateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateNote(id, data),
    onSuccess: (data, variables, categoryId) => {
      const noteId = data.updatedNote.id;

      // Invalidate both the list and the specific note queries
      queryClient.setQueryData(noteKeys.detail(variables.id), data);
      queryClient.invalidateQueries({ queryKey: noteKeys.detail(noteId) });
      queryClient.invalidateQueries({ queryKey: noteKeys.lists() });
      if (categoryId) {
        queryClient.invalidateQueries({
          queryKey: categoryKeys.categoryNotes(categoryId, {}),
        });
      }
    },
  });
};

/**
 * Hook for deleting a note
 */
export const useDeleteNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ noteId, categoryId }) => {
      return deleteNote(noteId);
    },
    onSuccess: (_, { noteId, categoryId }) => {
      queryClient.removeQueries({ queryKey: noteKeys.detail(noteId) });

      queryClient.invalidateQueries({ queryKey: noteKeys.lists() });
      queryClient.invalidateQueries({ queryKey: categoryKeys.lists() });

      if (categoryId) {
        queryClient.invalidateQueries({
          queryKey: categoryKeys.categoryNotes(categoryId, {}),
        });
      }
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
