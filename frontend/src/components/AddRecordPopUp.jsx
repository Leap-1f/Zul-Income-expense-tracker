import React, { useState } from "react";
import { AddRecordCategory } from "./AddRecordCategory";
import { useContext } from "react";
import { Context } from "./utils/context";
import { iconComponentMap } from "./utils/CategoryIcons";
import { useEffect } from "react";

export const AddRecordPopUp = ({
  setShowAddRecordModal,
  setShowAddCategory,
}) => {
  const [selectedValue, setSelectedValue] = useState("expense");
  const [categoryBox, setCategoryBox] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState({ id: "" });
  const [selectedCategoryData, setSelectedCategoryData] = useState({});

  const [categoryData, setCategoryData] = useState([]);

  const fetchData = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/api`, {
      method: "GET",
      cache: "no-cache",
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());

    setCategoryData(res);
  };
  const fetchSelectedCategoryData = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_ENDPOINT}/api/category`,
      {
        method: "POST",
        cache: "no-cache",
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedCategoryId),
      }
    ).then((res) => res.json());
    console.log(res);
    setSelectedCategoryData(res);
  };
  console.log(selectedCategoryData, "selectedCategoryData");
  // console.log(selectedCategoryData[0].name, "selectedCategoryData.name");
  // const addData = (addedData) => {
  //   setCategoryData(...prev, addedData);
  // };

  useEffect(() => {
    fetchData();
    fetchSelectedCategoryData();
  }, []);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  let IconComponent = "";
  if (selectedCategoryData.length > 0) {
    IconComponent = iconComponentMap[selectedCategoryData[0].category_image];
    return;
  }
  const handleSelectChange = (event) => {
    // Assuming you want to show the box when any option is selected
    setCategoryBox(!categoryBox);
  };
  return (
    <div className="">
      <div className="min-w-[700px] relative ">
        <div className="absolute right-4 top-0">
          <button
            onClick={() => {
              setShowAddRecordModal(false);
            }}
            className="btn btn-sm btn-circle btn-ghost "
          >
            ✕
          </button>
        </div>
        <h3 className="font-bold text-lg mb-3 ">Add Record</h3>
        <div className="flex gap-10 border-t py-3">
          <div className="flex flex-col gap-5 w-1/2 relative">
            <div className="relative w-[full] h-10">
              <div className="bg-[#e4e4e4] w-full h-full rounded-[20px]"></div>
              <div className="absolute top-0 left-0 z-1 w-full h-full">
                <div className="flex mb-9 overflow-hidden w-full h-full ">
                  <input
                    type="radio"
                    id="radio-one"
                    name="switch-one"
                    value="expense"
                    checked={selectedValue === "expense"}
                    onChange={handleChange}
                    className="absolute w-1 h-1 opacity-0"
                  />
                  <label
                    htmlFor="radio-one"
                    className={`w-1/2 font-medium text-sm px-4 py-2 transition rounded-full text-center ${
                      selectedValue === "expense"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    Expense
                  </label>
                  <input
                    type="radio"
                    id="radio-two"
                    name="switch-one"
                    value="income"
                    checked={selectedValue === "income"}
                    onChange={handleChange}
                    className="absolute w-1 h-1 opacity-0"
                  />
                  <label
                    htmlFor="radio-two"
                    className={`w-1/2 font-medium text-sm px-4 py-2 transition rounded-full text-center ${
                      selectedValue === "income"
                        ? "bg-green-600 text-white"
                        : "bg-gray-200 text-gray-700 "
                    }`}
                  >
                    Income
                  </label>
                </div>
              </div>
            </div>
            <div className="input input-bordered flex flex-col p-1 h-auto gap-2 bg-[#F9FAFB]">
              <label className="text-gray-700">Amount</label>
              <input className="" type="text" placeholder="₮ 0.00" />
            </div>
            <div className="flex flex-col relative">
              <label htmlFor="" className="text-gray-700 mb-2">
                Category
              </label>
              <button
                onClick={handleSelectChange}
                className="h-12 w-full rounded-md border border-gray-300 bg-gray-50 text-start px-3 hover:bg-gray-100"
              >
                {" "}
                {!selectedCategory && "Find or choose categssssory"}
                {selectedCategory && (
                  <div
                    key={selectedCategoryData[0] && selectedCategoryData[0].id}
                    className="flex w-full p-3 gap-3 rounded-t-md hover:bg-gray-50 active:scale-95"
                  >
                    {IconComponent && (
                      <IconComponent
                        color={
                          selectedCategoryData[0] &&
                          selectedCategoryData[0].description
                        }
                        className="w-5 h-5"
                      />
                    )}
                    <p>
                      {selectedCategoryData[0] && selectedCategoryData[0].name}
                    </p>
                  </div>
                )}
              </button>
              {categoryBox && (
                <AddRecordCategory
                  setShowAddRecordModal={setShowAddRecordModal}
                  setShowAddCategory={setShowAddCategory}
                  categoryData={categoryData}
                  setSelectedCategoryId={setSelectedCategoryId}
                  setSelectedCategory={setSelectedCategory}
                  setCategoryBox={setCategoryBox}
                />
              )}
            </div>
            <div className="flex *:flex *:flex-col *:gap-2 justify-between *:w-[48%] ">
              <form>
                <label htmlFor="transactionDate" className="text-gray-700">
                  Date
                </label>
                <input
                  type="date"
                  id="transactionDate"
                  name="date"
                  className="input input-bordered bg-gray-50 cursor-pointer"
                />
              </form>
              <form>
                <label htmlFor="transactionTime" className="text-gray-700">
                  Time
                </label>
                <input
                  type="time"
                  id="transactionTime"
                  name="time"
                  className="input input-bordered bg-gray-50 cursor-pointer"
                />
              </form>
            </div>
            <button
              className={`${
                selectedValue === "income" ? "bg-green-600" : "bg-blue-600"
              } btn text-white rounded-full`}
            >
              Add Record
            </button>
          </div>
          <div className="w-1/2 flex flex-col justify-between">
            <div className="">
              <label htmlFor="">Payee</label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs mt-2"
              />
            </div>
            <div className="">
              <label htmlFor="">Note</label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full h-[250px] mt-2"
              />
            </div>
          </div>
        </div>
        {/* 
        <div className="modal-action">
          <label htmlFor="my_modal_6" className="btn">
            Close!
          </label>
        </div> */}
      </div>
    </div>
  );
};
