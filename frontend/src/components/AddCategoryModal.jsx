import React, { useContext, useState } from "react";
import { Context } from "./utils/context";
import { AddRecord } from "./AddRecordModal";
import { ArrowDropDown, Home } from "./utils/CategoryIcons";
import { categoryIcons } from "./utils/CategoryIcons";

export const AddCategoryModal = () => {
  const { setShowAddCategory } = useContext(Context);
  const [selectedIconIndex, setSelectedIconIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState("gray");
  const [categoryIconsBox, setCategoryIconsBox] = useState(false);
  const [newCategoryInfo, setNewCategoryInfo] = useState({
    categoryName: "",
    categoryImg: "",
  });

  const handleSelectChangeToggle = () => {
    setCategoryIconsBox(!categoryIconsBox);
  };
  const handleSelectChange = () => {
    setCategoryIconsBox(false);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
    const IconComponent = categoryIcons[selectedIconIndex];
    if (IconComponent) {
      setNewCategoryInfo({
        ...newCategoryInfo,
        categoryImg: <IconComponent color={color} className="w-5 h-5" />,
      });
    }
  };

  const handleIconChange = (index) => {
    setSelectedIconIndex(index);
    const IconComponent = categoryIcons[index];
    if (IconComponent) {
      setNewCategoryInfo({
        ...newCategoryInfo,
        categoryImg: (
          <IconComponent color={selectedColor} className="w-5 h-5" />
        ),
      });
    }
  };
  const handleInputChange = (event) => {
    setNewCategoryInfo({
      ...newCategoryInfo,
      categoryName: event.target.value,
    });
  };
  console.log(newCategoryInfo, "newcatinfo");
  const renderSelectedIcon = () => {
    const IconComponent = categoryIcons[selectedIconIndex];
    if (IconComponent) {
      return <IconComponent color={selectedColor} className="w-5 h-5" />;
    }
    return null;
  };
  console.log(newCategoryInfo, "newcatinfokkk");
  return (
    <div className="absolute top-0 left-0 w-full h-[100vh] z-1">
      <div className="relative w-full h-[100vh] flex items-center justify-center">
        <div
          onClick={() => {
            setShowAddCategory(false);
          }}
          className="absolute top-0 left-0 w-full h-[100vh] bg-gray-900 opacity-25 z-2"
        ></div>
        <div className="w-[500px] h-[240px] p-5 rounded-xl bg-white absolute top-center left-center z-3 flex flex-col justify-between">
          <div className="flex justify-between items-start border-b pb-3">
            <h3 className="font-bold text-lg ">Add category</h3>
            <div className="modal-action m-0">
              <label
                htmlFor="my_modal_6"
                className="btn btn-sm btn-circle btn-ghost"
              >
                ✕
              </label>
              <input type="checkbox" id="my_modal_6" className="modal-toggle" />
              <AddRecord></AddRecord>
            </div>
          </div>
          <div className="relative">
            <div className="flex justify-between">
              <div
                onClick={handleSelectChangeToggle}
                className="h-12 w-[20%] rounded-md border border-gray-300 bg-gray-50 flex justify-end gap-3 items-center active:scale-95"
              >
                {renderSelectedIcon()}
                <ArrowDropDown />
              </div>
              <input
                type="text"
                placeholder="Name"
                onClick={handleSelectChange}
                className="input input-bordered w-[78%]"
                onChange={handleInputChange}
              />
            </div>
            {categoryIconsBox && (
              <div className="w-[300px] h-[300px] bg-red-200 absolute top-[50px] rounded-md shadow-xl p-3">
                <div className="flex flex-col h-full justify-between">
                  <div className="grid grid-cols-6 h-full">
                    {categoryIcons.map((IconComponent, index) => (
                      <div
                        className="flex justify-center items-center p-1"
                        key={index}
                        onClick={() => handleIconChange(index)}
                      >
                        <IconComponent color="gray" className="w-5 h-5" />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mx-3 *:w-6 *:h-6 *:rounded-full *:text-center border-t pt-4">
                    {[
                      "purple",
                      "blue",
                      "green",
                      "yellow",
                      "orange",
                      "red",
                      "black",
                    ].map((color, index) => {
                      let code = "-500";
                      color == "black" ? (code = "") : "-500";
                      return (
                        <div
                          key={index}
                          className={`bg-${color}${code}`}
                          onClick={() => handleColorChange(color)}
                        ></div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
          <button
            disabled={categoryIconsBox}
            className="btn w-full text-white rounded-full bg-green-600"
          >
            Add Category
          </button>
        </div>
      </div>
    </div>
  );
};
