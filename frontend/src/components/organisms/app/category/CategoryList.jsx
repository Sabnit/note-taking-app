import { Hash } from "lucide-react";
import React from "react";

import Header from "../../../molecules/app/Header";
import Loader from "../../../molecules/app/PageIsLoading";
import Category from "../../../molecules/app/category/CategoryItem";
import { useCategories } from "../../../../hooks/query/useCategories";

const CategoryList = () => {
  const { data, isLoading, isError } = useCategories();

  if (isLoading) return <Loader />;

  const { categories, pagination } = data;

  return (
    <div className="flex flex-col max-w-3/4 mx-auto py-10">
      <Header
        title={"My Categories"}
        count={categories.length}
        unit={"Categories"}
      />
      {categories.map((category, index) => (
        <Category key={index} category={category.title} />
      ))}
    </div>
  );
};

export default CategoryList;
