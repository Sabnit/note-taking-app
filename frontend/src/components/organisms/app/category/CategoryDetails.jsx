import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Edit, NotepadText, Trash } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import Header from "../../../molecules/app/Header";
import Loader from "../../../molecules/app/PageIsLoading";
import Pagination from "../../../molecules/app/pagination";
import NoteItem from "../../../molecules/app/note/NoteItem";
import NoteListLayout from "../../../molecules/app/NoteListLayout";
import AddNoteButton from "../../../molecules/app/note/AddNoteButton";

import { PAGE_LIMIT } from "../../../../constants/pagination";
import { CLIENT_ROUTES } from "../../../../constants/clientRoutes";

import { groupNotesByDate } from "../../../../utils/formatter";

import {
  useCategoryNotes,
  useDeleteCategory,
  useUpdateCategory,
  usePrefetchNextCategoryNotes,
} from "../../../../hooks/query/useCategories";
import { AppContext } from "../../../../context/AppContext";

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
    useContext(AppContext);

  const updateCategoryMutation = useUpdateCategory();
  const deleteCategoryMutation = useDeleteCategory();

  // // Prefect nextPage data
  usePrefetchNextCategoryNotes({
    categoryId: id,
    currentOptions: paginationOptions,
    data,
  });

  const handlePageChange = (newPage) => {
    setPaginationOptions((prev) => ({ ...prev, page: newPage }));
  };

  const handleEdit = () => {
    setIsAddCategoryModalOpen((prev) => !prev);

    setSelectedCategoryId(id);
    // updateCategoryMutation.mutate(
    //   { id },
    //   {
    //     onSuccess: () => {
    //       toast.success("Category updated successfully");
    //     },
    //   }
    // );
  };
  const handleDelete = () => {
    deleteCategoryMutation.mutate(
      { id },
      {
        onSuccess: () => {
          toast.success("Category deleted successfully");
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
  if (isLoading) return <Loader />;

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

      <NoteListLayout notes={groupedNotes} />
      <AddNoteButton style={"normal"} />
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
