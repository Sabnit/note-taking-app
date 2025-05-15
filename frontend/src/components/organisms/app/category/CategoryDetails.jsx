import React, { useContext, useState } from "react";
import { Edit, NotepadText, Trash } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import Pagination from "../../../molecules/Pagination";
import NotesLayout from "../../../templates/NotesLayout";
import PageIsLoading from "../../../molecules/PageIsLoading";
import AddNoteButton from "../../../molecules/note/AddNoteButton";

import { PAGE_LIMIT } from "../../../../constants/pagination";
import { CLIENT_ROUTES } from "../../../../constants/clientRoutes";

import { showToast } from "../../../../utils/toast";
import { groupNotesByDate } from "../../../../utils/formatter";

import { NoteContext } from "../../../../context/NoteContext";
import { CategoryContext } from "../../../../context/CategoryContext";

import {
  useCategoryNotes,
  useDeleteCategory,
  usePrefetchNextCategoryNotes,
} from "../../../../hooks/query/useCategories";

const CategoryDetails = () => {
  const [paginationOptions, setPaginationOptions] = useState({
    page: 1,
    limit: PAGE_LIMIT,
    sortBy: "date",
    order: "desc",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useCategoryNotes(
    id,
    paginationOptions
  );

  const { setIsAddCategoryModalOpen, setSelectedCategoryId } =
    useContext(CategoryContext);

  const { setIsAddNoteModalOpen } = useContext(NoteContext);

  const deleteCategoryMutation = useDeleteCategory();

  // // Prefect nextPage data
  // usePrefetchNextCategoryNotes({
  //   categoryId: id,
  //   currentOptions: paginationOptions,
  //   data,
  // });

  const handlePageChange = (newPage) => {
    setPaginationOptions((prev) => ({ ...prev, page: newPage }));
  };

  const handleEdit = () => {
    setIsAddCategoryModalOpen((prev) => !prev);

    setSelectedCategoryId(id);
  };
  const handleDelete = () => {
    deleteCategoryMutation.mutate(
      { id },
      {
        onSuccess: () => {
          showToast.success("Category deleted successfully");
          navigate(CLIENT_ROUTES.APP_ROUTE.NOTES);
        },
      }
    );
  };

  const handleSortChange = (sortField) => {
    setPaginationOptions((prev) => ({
      ...prev,
      sortBy: sortField,
      order:
        prev.sortBy === sortField && prev.order === "desc" ? "asc" : "desc",
    }));
  };

  if (isError) return <div>Error: {error.message}</div>;
  if (isLoading) return <PageIsLoading />;

  const { notes, categoryTitle, pagination } = data;

  const groupedNotes = Object.entries(groupNotesByDate(notes));

  return (
    <div className="max-w-3/4 mx-auto font-sans py-10">
      <div className="flex items-center gap-5">
        <h1 className="text-3xl font-bold mb-2 text-gray-600">
          {categoryTitle}
        </h1>
        <Edit
          size={25}
          className="text-red-300 hover:text-red-500 cursor-pointer"
          onClick={handleEdit}
        />
        <Trash
          size={25}
          className="text-red-300 hover:text-red-500 cursor-pointer"
          onClick={handleDelete}
        />
      </div>
      <div className="flex items-center gap-2 text-gray-500 mb-3 mt-2 pb-3 border-b-1 border-gray-200">
        <NotepadText size={18} />
        <span>
          {notes.length} {notes.length > 1 ? "Notes" : "Note"}
        </span>
      </div>

      <NotesLayout notes={groupedNotes} />
      <AddNoteButton
        variant="normal"
        onClick={() => setIsAddNoteModalOpen((prev) => !prev)}
      />
      <Pagination
        page={pagination.page}
        totalPages={pagination.totalPages}
        hasPreviousPage={pagination.hasPreviousPage}
        hasNextPage={pagination.hasNextPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default CategoryDetails;
