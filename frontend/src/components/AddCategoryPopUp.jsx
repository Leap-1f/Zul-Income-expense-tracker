import React, { useEffect, useState } from "react";
import { ArrowDropDown} from "./utils/CategoryIcons";
import { iconComponentMap } from "./utils/CategoryIcons";
import { MdHome } from "react-icons/md";
import { useContext } from "react";
import { Context } from "./utils/context";

export const AddCategoryPopUp = ({
  setShowAddRecordPopUp,
  setShowAddCategory,
  newCategoryInfo,
  setNewCategoryInfo,
  addCategoryData,
}) => {
  const iconComponentMapArray = Object.entries(iconComponentMap);
  let { selectedCategoryData } = useContext(Context);
  const [selectedIconImage, setSelectedIconImage] = useState("MdHome");
  const [selectedColor, setSelectedColor] = useState("gray");
  const [categoryIconsBox, setCategoryIconsBox] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");

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
  };

  const handleIconChange = (key) => {
    setSelectedIconImage(key);
    setNewCategoryInfo({
      ...newCategoryInfo,
      categoryImg: `${key}`,
    });
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
    const selectedIconComponent = iconComponentMapArray.find(
      ([key]) => key === selectedIconImage
    );
    if (selectedIconComponent) {
      const [, IconComponent] = selectedIconComponent;
      return <IconComponent color={selectedColor} className="w-5 h-5" />;
    }

    return null;
  };

  const addCategoryButton = async () => {
    setIsLoading(true);
    // let selectedCategoryData = [];
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_ENDPOINT}/api/category/select-category`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(newCategoryInfo),
        }
      );
      console.log(newCategoryInfo, "newcategoryInfo");
      selectedCategoryData = await res.json();
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
    if (selectedCategoryData.length !== 0) {
      setIsLoading(false);
      setWarningMessage("This category is registered."),
        setNewCategoryInfo({
          categoryName: "",
          categoryImg: "MdHome",
          color: "gray",
        });
      selectedCategoryData = [];
      console.log(selectedCategoryData, "burtgegdsen category baina");
    } else if (selectedCategoryData.length === 0) {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_ENDPOINT}/api/category`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(newCategoryInfo),
          }
        );
        const data = await res.json();
        addCategoryData(data[data.length - 1][0]);
      } catch (err) {
        console.log(err);
      }
      setSelectedColor("gray");
      setSelectedIconImage("MdHome");
      setShowAddCategory(false);
    } else {
      console.log("selectedCategoryData.length  ?");
    }
  };
  return (
    <div className="absolute top-0 left-0 w-full z-1">
      <div className="relative w-full  flex items-center justify-center">
        <div
          onClick={() => {
            setShowAddCategory(false);
          }}
          className="absolute top-0 left-0 w-full h-[100vh] z-2"
        ></div>

        <div
          style={{ opacity: isLoading ? "0.7" : "1" }}
          className="w-[500px] h-[240px] p-5 rounded-xl bg-white absolute top-[100px] left-center z-3 shadow-2xl"
        >
          <div className="relative h-full">
            <div className="flex flex-col justify-between h-full">
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
                {warningMessage && (
                  <p className="text-red-500 text-xs pt-1">{warningMessage}</p>
                )}
                {categoryIconsBox && (
                  <div className="w-[300px] h-[300px] bg-white absolute top-[50px] rounded-md shadow-xl p-3">
                    <div className="flex flex-col h-full justify-between">
                      <div className="grid grid-cols-6 h-full">
                        {iconComponentMapArray.map(
                          ([key, IconComponent], index) => (
                            <div
                              className="flex justify-center items-center p-1"
                              key={index}
                              onClick={() => handleIconChange(key)}
                            >
                              <IconComponent color="gray" className="w-5 h-5" />
                            </div>
                          )
                        )}
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
          </div>
          {isLoading && (
            <div className="absolute top-[100px] left-[240px]">
              <span className="loading loading-spinner loading-md "></span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
