import { useState } from "react";
import { AddCategoryIcon } from "./utils/CategoryIcons";
import { useContext } from "react";
import { Context } from "./utils/context";

export const AddRecordCategory = () => {
  const { setShowAddCategory } = useContext(Context);

  return (
    <div className="w-full h-[200px] bg-white absolute top-[80px] rounded-md shadow-lg">
      <label
        onClick={() => {
          setShowAddCategory(true);
        }}
        htmlFor="my_modal_6"
        className="flex w-full p-3 gap-2 border-b rounded-t-md hover:bg-gray-50 active:scale-95"
      >
        <AddCategoryIcon />
        <p>Add Category</p>
      </label>
    </div>
  );
};
