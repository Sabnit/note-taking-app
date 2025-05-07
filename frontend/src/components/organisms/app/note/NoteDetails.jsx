import React, { useState } from "react";
import { NotepadText } from "lucide-react";

import Header from "../../../molecules/app/Header";
import Pagination from "../../../molecules/app/Pagination";
import PageIsLoading from "../../../molecules/app/PageIsLoading";
import AddNoteButton from "../../../molecules/app/note/AddNoteButton";

import NoteListLayout from "../../../templates/NotesLayout";

import { PAGE_LIMIT } from "../../../../constants/pagination";

import { groupNotesByDate } from "../../../../utils/formatter";

import {
  useNotes,
  usePrefetchNextNotes,
} from "../../../../hooks/query/useNotes";

const NoteDetails = () => {
  const [paginationOptions, setPaginationOptions] = useState({
    page: 1,
    limit: PAGE_LIMIT,
    sortBy: "date",
    order: "desc",
  });

  const { data, isLoading, isError, error } = useNotes(paginationOptions);

  // Prefetch next page data
  usePrefetchNextNotes({
    currentOptions: paginationOptions,
    data: data,
  });

  const handlePageChange = (newPage) => {
    setPaginationOptions((prev) => ({ ...prev, page: newPage }));
  };

  const handleSortChange = (sortField) => {
    setPaginationOptions((prev) => ({
      ...prev,
      sortBy: sortField,
      order:
        prev.sortBy === sortField && prev.order === "desc" ? "asc" : "desc",
      page: 1,
    }));
  };

  if (isError) return <div>Error: {error.message}</div>;
  if (isLoading) return <PageIsLoading />;

  const { notes, pagination } = data || {
    notes: [],
    pagination: {
      total: 0,
      page: 1,
      totalPages: 1,
      hasNextPage: false,
      hasPreviousPage: false,
    },
  };

  if (isError || !notes) {
    return (
      <div className="mt-5 mb-10">
        <p>Error loading notes.</p>
      </div>
    );
  }

  const groupedNotes = Object.entries(groupNotesByDate(notes));

  return (
    <div className="flex flex-col max-w-3/4 mx-auto py-5">
      <Header title={"Notes"} count={pagination.total} unit={"notes"} />

      {/* Notes */}
      <div className="space-y-2">
        {notes.length > 0 ? (
          <>
            <NoteListLayout notes={groupedNotes} />
            <AddNoteButton style={"normal"} />
            <Pagination
              page={pagination.page}
              totalPages={pagination.totalPages}
              hasPreviousPage={pagination.hasPreviousPage}
              hasNextPage={pagination.hasNextPage}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <div className="text-center py-10">
            <span className="text-gray-500">No notes found</span>
            <AddNoteButton style={"normal"} />
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteDetails;
