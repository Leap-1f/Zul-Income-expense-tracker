import { useState, useEffect } from "react";
import { AddCategoryIcon } from "./utils/CategoryIcons";
import { useContext } from "react";
import { Context } from "./utils/context";
import { iconComponentMap } from "./utils/CategoryIcons";
import { AddCategoryModal } from "./AddCategoryModal";
import { AddCategoryPopUp } from "./AddCategoryPopUp";

export const AddRecordCategory = ({
  setShowAddRecordModal,
  setShowAddCategory,
}) => {
  // const { setShowAddCategory } = useContext(Context);
  // const [showAddCategory, setShowAddCategory] = useState(false);
  const [categoryData, setCategoryData] = useState([]);

  const fetchData = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_ENDPOINT}/api/category`,
      {
        method: "GET",
        cache: "no-cache",
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      }
    ).then((res) => res.json());

    setCategoryData(res);
  };

  const addData = (addedData) => {
    setCategoryData(...prev, addedData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddCategory = () => {
    setShowAddCategory(true);
    setShowAddRecordModal(false);
  };

  return (
    <div className="w-full h-[300px] bg-white absolute top-[80px] rounded-md shadow-lg overflow-auto">
      <label
        onClick={handleAddCategory}
        htmlFor="my_modal_6"
        className="flex w-full p-3 gap-3 border-b rounded-t-md hover:bg-gray-50 active:scale-95"
      >
        <AddCategoryIcon />
        <p>Add Category</p>
      </label>
      <div className="overflow-auto">
        {categoryData.map((element) => {
          const IconComponent = iconComponentMap[element.category_image];

          return (
            <div
              key={element.id}
              htmlFor="my_modal_6"
              className="flex w-full p-3 gap-3 rounded-t-md hover:bg-gray-50 active:scale-95"
            >
              {IconComponent && (
                <IconComponent
                  color={element.description}
                  className="w-5 h-5"
                />
              )}
              <p>{element.name}</p>
            </div>
          );
        })}
      </div>

      {/* {showAddCategory && (
        <AddCategoryPopUp
          setShowAddCategory={setShowAddCategory}
          addData={addData}
        />
      )} */}
    </div>
  );
};
