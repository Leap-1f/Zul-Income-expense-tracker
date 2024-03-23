import React, { useState } from "react";
import { AddRecordCategory } from "./AddRecordCategory";
import { iconComponentMap } from "./utils/CategoryIcons";
import { useEffect } from "react";
import { AddCategoryPopUp } from "./AddCategoryPopUp";
import { MdHome } from "react-icons/md";
import { useFormik, FormikProvider } from "formik";
import { amountSchema } from "./login/validationSchema";
import moment from "moment";

export const AddRecordPopUp = ({ setShowAddRecordPopUp }) => {
  const [selectedValue, setSelectedValue] = useState("EXP");
  const [categoryBox, setCategoryBox] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingFetchAllCategoryData, setIsLoadingFetchAllCategoryData] =
    useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [selectedCategoryInfo, setSelectedCategoryInfo] = useState({
    name: "",
    color: "",
    image: "",
  });
  const [categoryData, setCategoryData] = useState([]);
  const [newCategoryInfo, setNewCategoryInfo] = useState({
    categoryName: "",
    categoryImg: MdHome.name,
    color: "gray",
  });

  const fetchData = async () => {
    setIsLoadingFetchAllCategoryData(true);
    try {
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
      setIsLoadingFetchAllCategoryData(false);
    } catch (err) {
      console.log(err);
    }
  };

  const addCategoryData = (newData) => {
    console.log(newData, "its new data");
    setCategoryData((prev) => [...prev, newData]);

    console.log("its category data", categoryData);
  };

  useEffect(() => {
    fetchData();
    console.log("category nemehed useeffect ajillaa");
  }, []);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  let IconComponent = "";
  if (selectedCategoryInfo.length > 0) {
    IconComponent = iconComponentMap[selectedCategoryInfo];
    return;
  }
  const handleSelectChange = (selectedElement) => {
    setCategoryBox(!categoryBox);
  };
  const formikAddRecord = useFormik({
    initialValues: {
      switchOne: selectedValue,
      amount: "",
      categoryId: "",
      date: "",
      time: "",
      payee: "",
      note: "",
      dateAndTime: "",
    },
    validationSchema: amountSchema,
    onSubmit: async (values) => {
      values.switchOne = selectedValue;
      console.log("date, time" + values.date, values.time);
      // values.dateAndTime = values.date + "T" + values.time;
      values.dateAndTime = moment(`${values.date} ${values.time}`).format();
      console.log(values.dateAndTime, "dateandtime");
      console.log(selectedCategoryInfo);
      try {
        const selectedCategoryId = await fetch(
          `${process.env.NEXT_PUBLIC_ENDPOINT}/api/category/select-category-id`,
          {
            method: "POST",
            cache: "no-cache",
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
              // Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(selectedCategoryInfo),
          }
        ).then((selectedCategoryId) => selectedCategoryId.json());
        values.categoryId = selectedCategoryId[0].id;
      } catch (err) {
        console.log(err);
      }
      console.log(values);
      try {
        setIsLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_ENDPOINT}/api/transaction`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(values),
          }
        );
        const response = await res.json();
        console.log(response);
        setIsLoading(false);
        setShowAddRecordPopUp(false);
      } catch (err) {
        console.log(err);
      }
      console.log("duuslaaaaaaaaaaa");
    },
  });
  return (
    <div className="fixed inset-0 flex items-center justify-center z-1">
      <div className="relative ">
        {isLoading && (
          <div className="w-full h-full absolute top-[0px] left-[0px]">
            <div className="w-full h-full flex justify-center items-center">
              <span className="loading loading-spinner loading-md "></span>
            </div>
          </div>
        )}
        <div
          style={{ opacity: showAddCategory ? "0" : isLoading ? "0.7" : "1" }}
          className="bg-white p-4 rounded-2xl shadow-2xl"
        >
          <div className="min-w-[700px] relative ">
            <div className="absolute right-4 top-0">
              <button
                onClick={() => {
                  setShowAddRecordPopUp(false);
                }}
                className="btn btn-sm btn-circle btn-ghost "
              >
                ✕
              </button>
            </div>
            <h3 className="font-bold text-lg mb-3 ">Add Record</h3>
            <FormikProvider value={formikAddRecord}>
              <form
                onSubmit={formikAddRecord.handleSubmit}
                className="flex gap-10 border-t py-3"
              >
                <div className="flex flex-col gap-5 w-1/2 relative">
                  <div className="relative w-[full] h-10">
                    <div className="bg-[#e4e4e4] w-full h-full rounded-[20px]"></div>
                    <div className="absolute top-0 left-0 z-1 w-full h-full">
                      <div className="flex mb-9 overflow-hidden w-full h-full ">
                        <input
                          type="radio"
                          id="radio-one"
                          name="switchOne"
                          value="EXP"
                          checked={selectedValue === "EXP"}
                          onChange={handleChange}
                          className="absolute w-1 h-1 opacity-0"
                        />
                        <label
                          htmlFor="radio-one"
                          className={`w-1/2 font-medium text-sm px-4 py-2 transition rounded-full text-center ${
                            selectedValue === "EXP"
                              ? "bg-blue-600 text-white"
                              : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          Expense
                        </label>
                        <input
                          type="radio"
                          id="radio-two"
                          name="switchOne"
                          value="INC"
                          checked={selectedValue === "INC"}
                          onChange={handleChange}
                          className="absolute w-1 h-1 opacity-0"
                        />
                        <label
                          htmlFor="radio-two"
                          className={`w-1/2 font-medium text-sm px-4 py-2 transition rounded-full text-center ${
                            selectedValue === "INC"
                              ? "bg-green-600 text-white"
                              : "bg-gray-200 text-gray-700 "
                          }`}
                        >
                          Income
                        </label>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="input input-bordered flex flex-col p-1 h-auto gap-2 bg-[#F9FAFB]">
                      <label className="text-gray-700">Amount</label>
                      <input
                        onChange={formikAddRecord.handleChange}
                        className=""
                        name="amount"
                        type="text"
                        placeholder="₮ 0.00"
                        value={formikAddRecord.values.amount}
                      />
                    </div>
                    {formikAddRecord.errors.amount &&
                    formikAddRecord.touched.amount ? (
                      <div className="text-red-500 text-xs mt-1" id="">
                        {formikAddRecord.errors.amount}
                      </div>
                    ) : null}
                  </div>
                  <div className="flex flex-col relative">
                    <label htmlFor="" className="text-gray-700 mb-2">
                      Category
                    </label>
                    <button
                      type="button"
                      onClick={() => handleSelectChange()}
                      className="h-12 w-full rounded-md border border-gray-300 bg-gray-50 text-start px-3 hover:bg-gray-100"
                    >
                      {" "}
                      {!selectedCategory && "Find or choose category"}
                      {selectedCategory && (
                        <div className="overflow-auto">
                          {categoryData.map((element) => {
                            if (
                              selectedCategoryInfo.name === element.name &&
                              selectedCategoryInfo.color ===
                                element.description &&
                              selectedCategoryInfo.image ===
                                element.category_image
                            ) {
                              const IconComponent =
                                iconComponentMap[element.category_image];

                              return (
                                <div
                                  key={element.id}
                                  className="flex w-full gap-3 rounded-t-md active:scale-95"
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
                            } else {
                              console.log("selectedCategoryName.name bhgu");
                            }
                          })}
                        </div>
                      )}
                    </button>
                    {categoryBox && (
                      <AddRecordCategory
                        setShowAddCategory={setShowAddCategory}
                        categoryData={categoryData}
                        setSelectedCategoryInfo={setSelectedCategoryInfo}
                        setSelectedCategory={setSelectedCategory}
                        setCategoryBox={setCategoryBox}
                        newCategoryInfo={newCategoryInfo}
                        setNewCategoryInfo={setNewCategoryInfo}
                        isLoadingFetchAllCategoryData={
                          isLoadingFetchAllCategoryData
                        }
                      />
                    )}
                  </div>
                  <div className="flex *:flex *:flex-col *:gap-2 justify-between *:w-[48%] ">
                    <form>
                      <label
                        htmlFor="transactionDate"
                        className="text-gray-700"
                      >
                        Date
                      </label>
                      <input
                        type="date"
                        id="transactionDate"
                        name="date"
                        className="input input-bordered bg-gray-50 cursor-pointer"
                        onChange={formikAddRecord.handleChange}
                      />
                    </form>
                    <form>
                      <label
                        htmlFor="transactionTime"
                        className="text-gray-700"
                      >
                        Time
                      </label>
                      <input
                        type="time"
                        id="transactionTime"
                        name="time"
                        className="input input-bordered bg-gray-50 cursor-pointer"
                        onChange={formikAddRecord.handleChange}
                      />
                    </form>
                  </div>
                  <button
                    type="submit"
                    className={`${
                      selectedValue === "inc" ? "bg-green-600" : "bg-blue-600"
                    } btn text-white rounded-full`}
                  >
                    Add Record
                  </button>
                </div>
                <div className="w-1/2 flex flex-col justify-between">
                  <div className="">
                    <label htmlFor="">Payee</label>
                    <input
                      name="payee"
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered w-full max-w-xs mt-2"
                      onChange={formikAddRecord.handleChange}
                    />
                  </div>
                  <div className="">
                    <label htmlFor="">Note</label>
                    <input
                      name="note"
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered w-full h-[250px] mt-2"
                      onChange={formikAddRecord.handleChange}
                    />
                  </div>
                </div>
              </form>
            </FormikProvider>
          </div>
        </div>
        {showAddCategory && (
          <AddCategoryPopUp
            setShowAddRecordPopUp={setShowAddRecordPopUp}
            setShowAddCategory={setShowAddCategory}
            newCategoryInfo={newCategoryInfo}
            setNewCategoryInfo={setNewCategoryInfo}
            addCategoryData={addCategoryData}
          />
        )}
      </div>
    </div>
  );
};
