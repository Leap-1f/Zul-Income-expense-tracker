import React, { useContext, useEffect, useState } from "react";
import { ArrowDropDown, Home } from "./utils/CategoryIcons";
import { categoryIcons } from "./utils/CategoryIcons";

export const AddCategoryPopUp = ({
  setShowAddRecordPopUp,
  setShowAddCategory,
  newCategoryInfo,
  setNewCategoryInfo,
  addCategoryData,
}) => {
  const [selectedIconIndex, setSelectedIconIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState("gray");
  const [categoryIconsBox, setCategoryIconsBox] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectChangeToggle = () => {
    setCategoryIconsBox(!categoryIconsBox);
  };
  const handleSelectChange = () => {
    setCategoryIconsBox(false);
  };

  useEffect(() => {
    console.log(selectedColor, "updated selected color");
    setNewCategoryInfo({
      ...newCategoryInfo,
      color: selectedColor,
    });
  }, [selectedColor]);
  const handleColorChange = (color) => {
    setSelectedColor(color);

    console.log(selectedColor, "selected color");
    const IconComponent = categoryIcons[selectedIconIndex];
    console.log(IconComponent.name, "iconName");
    if (IconComponent) {
      setNewCategoryInfo({
        ...newCategoryInfo,
        categoryImg: `${IconComponent.name}`,
      });
    }
  };

  const handleIconChange = (index) => {
    setSelectedIconIndex(index);
    const IconComponent = categoryIcons[index];
  };
  function capitalizeFirstLetter(inputText) {
    if (!inputText || typeof inputText !== "string") {
      return "";
    }
    return inputText.charAt(0).toUpperCase() + inputText.slice(1).toLowerCase();
  }
  const handleInputChange = (event) => {
    const capitalizedText = capitalizeFirstLetter(event.target.value);
    setNewCategoryInfo({
      ...newCategoryInfo,
      categoryName: capitalizedText,
    });
  };
  const renderSelectedIcon = () => {
    const IconComponent = categoryIcons[selectedIconIndex];
    if (IconComponent) {
      return <IconComponent color={selectedColor} className="w-5 h-5" />;
    }
    return null;
  };

  const addCategoryButton = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/api`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(newCategoryInfo),
      });
      const data = await res.json();
      addCategoryData(data[data.length - 1][0]);
      // addData(data);
      //console.log(data, " its data from db after save");
      //console.log("its data that what i want ", data[data.length - 1][0]);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
    setSelectedColor("gray");
    setSelectedIconIndex(0);
    setShowAddCategory(false);
  };
  return (
    <div className="absolute top-0 left-0 w-full h-[100vh] z-1">
      <div className="relative w-full h-[100vh] flex items-center justify-center">
        <div
          onClick={() => {
            setShowAddCategory(false);
          }}
          className="absolute top-0 left-0 w-full h-[100vh] bg-gray-900 opacity-25 z-2"
        ></div>
        {isLoading && (
          <span className="loading loading-spinner loading-md"></span>
        )}
        {!isLoading && (
          <div className="w-[500px] h-[240px] p-5 rounded-xl bg-white absolute top-center left-center z-3 flex flex-col justify-between">
            <div className="flex justify-between items-start border-b pb-3">
              <h3 className="font-bold text-lg ">Add category</h3>
              <div
                onClick={() => {
                  setShowAddRecordPopUp(true);
                  setShowAddCategory(false);
                }}
                className=" m-0"
              >
                <label htmlFor="" className="btn btn-sm btn-circle btn-ghost">
                  ✕
                </label>
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
                  // value={''}
                />
              </div>
              {categoryIconsBox && (
                <div className="w-[300px] h-[300px] bg-white absolute top-[50px] rounded-md shadow-xl p-3">
                  <div className="flex flex-col h-full justify-between">
                    <div className="grid grid-cols-6 h-full">
                      {categoryIcons.map((IconComponent, index) => (
                        <div
                          className="flex justify-center items-center p-1 "
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
                        return (
                          <div
                            key={index}
                            onClick={() => handleColorChange(color)}
                            style={{ backgroundColor: color }}
                          ></div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div
              disabled={categoryIconsBox}
              onClick={addCategoryButton}
              className=" m-0 *:w-full btn bg-green-500 rounded-full"
            >
              <label htmlFor="" className="">
                Add Category
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
