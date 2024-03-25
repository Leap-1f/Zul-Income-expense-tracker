import { useEffect, useState } from "react";
import { iconComponentMap } from "../utils/CategoryIcons";
import { useContext } from "react";
import { Context } from "../utils/context";
import { TransactionDataByDate } from "./TransactionDataByDate";
import moment from "moment";

export const Record = ({ setShowAddRecordPopUp }) => {
  const [filteredTransactionDataByDate, setFilteredTransactionDataByDate] =
    useState([
      { todayTransactionData: [] },
      { yesterdayTransactionData: [] },
      { lastWeekTransactionData: [] },
      { lastMonthTransactionData: [] },
      { last3MonthsTransactionData: [] },
      { otherTransactionData: [] },
    ]);
  const [allSelected, setAllSelected] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const {
    newCategoryData,
    setNewcategoryData,
    newTransactionData,
    setNewTransactionData,
    balance,
  } = useContext(Context);
  const [filterNewOrOld, setFilterNewOrOld] = useState("newest");
  const [minRange, setMinRange] = useState(0);
  const [maxRange, setMaxRange] = useState(100000);
  const [allCategoryData, setAllCategoryData] = useState();
  const [allTransactionData, setAllTransactionData] = useState();
  const [isLoadingFetchAllCategoryData, setIsLoadingFetchAllCategoryData] =
    useState(false);
  const [
    isLoadingFetchAllTransactionData,
    setIsLoadingFetchAllTransactionData,
  ] = useState(false);
  const [filteredData, setFilteredData] = useState();
  const [filterAttribute, setFilterAttribute] = useState({
    selectedCatId: "",
    selectedType: "ALL",
    rangeLow: minRange,
    rangeHigh: maxRange,
    search: "",
  });

  const fetchData = async (endpoint) => {
    const userId = localStorage.getItem("id");
    console.log(userId, "userid shuu");
    try {
      if (endpoint === "category") {
        setIsLoadingFetchAllCategoryData(true);
      } else {
        setIsLoadingFetchAllTransactionData(true);
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_ENDPOINT}/api/${endpoint}`,
        {
          method: "POST",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: userId }),
        }
      ).then((res) => res.json());

      if (endpoint === "category") {
        setAllCategoryData(res);
        console.log(newCategoryData, "haai");
        if (newCategoryData.length !== 0) {
          addCategoryData(newCategoryData);
          setNewcategoryData();
        }
        setIsLoadingFetchAllCategoryData(false);
      } else if (endpoint === "transaction") {
        setAllTransactionData(res);
        setFilteredData(res);
        console.log(newTransactionData, "nadaa heergtei bn");
        if (newTransactionData.length !== 0) {
          // addTransactionData(newTransactionData);
          setNewTransactionData([]);
        }

        console.log("filtered data", filteredData);
        setIsLoadingFetchAllTransactionData(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addCategoryData = (newData) => {
    if (allCategoryData) {
      setAllCategoryData((prev) => [...prev, newData[0]]);
    }
  };
  // const addTransactionData = (newData) => {

  //   if (allTransactionData) {
  //     setAllTransactionData((prev) => [...prev, newData[0]]);
  //   }
  //   if (filteredData) {
  //     setFilteredData((prev) => [...prev, newData[0]]);
  //   }
  // };

  const filterDataByDate = (data, startDate, endDate) => {
    return data
      ?.filter((item) => {
        const datePart = item.transaction_date?.split("T")[0];
        const transactionDateAndTime = moment(
          `${datePart} ${item.transaction_time}`
        ).format();
        const itemDate = new Date(transactionDateAndTime);
        return itemDate >= startDate && itemDate <= endDate;
      })
      .sort((a, b) => {
        const aDate = moment(
          `${a.transaction_date} ${a.transaction_time}`
        ).format();
        const bDate = moment(
          `${b.transaction_date} ${b.transaction_time}`
        ).format();
        return new Date(aDate) - new Date(bDate);
      });
  };

  const filterTransactionDataByAttribute = () => {
    let filteredDataByAttribute = allTransactionData;
    if (filterAttribute.search !== "") {
      filteredDataByAttribute = filteredDataByAttribute?.filter((item) =>
        item.description
          .toLowerCase()
          .includes(filterAttribute.search.toLowerCase())
      );
    }
    if (filterAttribute.selectedCatId !== "") {
      filteredDataByAttribute = filteredDataByAttribute?.filter(
        (item) => item.category_id === filterAttribute.selectedCatId
      );
    }
    if (filterAttribute.selectedType !== "ALL") {
      filteredDataByAttribute = filteredDataByAttribute?.filter(
        (item) => item.transaction_type === filterAttribute.selectedType
      );
    }
    if (
      filterAttribute.rangeLow !== null &&
      filterAttribute.rangeHigh !== null
    ) {
      filteredDataByAttribute = filteredDataByAttribute?.filter(
        (item) =>
          item.amount >= filterAttribute.rangeLow &&
          item.amount <= filterAttribute.rangeHigh
      );
    }
    setFilteredData(filteredDataByAttribute);
  };
  const getTransactionDataByDateRange = (dateRange) => {
    const now = new Date();
    let startDate, endDate;

    switch (dateRange) {
      case "today":
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        endDate = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() + 1
        );
        break;
      case "yesterday":
        startDate = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() - 1
        );
        endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case "lastWeek":
        startDate = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() - 7
        );
        endDate = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() - 1
        );
        break;
      case "lastMonth":
        startDate = new Date(
          now.getFullYear(),
          now.getMonth() - 1,
          now.getDate()
        );
        endDate = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() - 7
        );
        break;
      case "last3Months":
        startDate = new Date(
          now.getFullYear(),
          now.getMonth() - 3,
          now.getDate()
        );
        endDate = new Date(
          now.getFullYear(),
          now.getMonth() - 1,
          now.getDate()
        );
        break;
      case "otherTransactionData":
        startDate = new Date(
          now.getFullYear() - 10,
          now.getMonth(),
          now.getDate()
        );
        endDate = new Date(
          now.getFullYear(),
          now.getMonth() - 3,
          now.getDate()
        );
        break;
      default:
        return [];
    }
    // console.log(filterDataByDate(filteredData, startDate, endDate), "hi");
    return filterDataByDate(filteredData, startDate, endDate);
  };

  const lastWeekCarousel = () => {
    setFilteredTransactionDataByDate((prev) => ({
      ...prev,
      todayTransactionData: getTransactionDataByDateRange("today"),
      yesterdayTransactionData: getTransactionDataByDateRange("yesterday"),
      lastWeekTransactionData: getTransactionDataByDateRange("lastWeek"),
      lastMonthTransactionData: [],
      last3MonthsTransactionData: [],
      otherTransactionData: [],
    }));
    console.log("hoosolloo");
  };
  const lastMonthCarousel = () => {
    setFilteredTransactionDataByDate((prev) => ({
      ...prev,
      todayTransactionData: getTransactionDataByDateRange("today"),
      yesterdayTransactionData: getTransactionDataByDateRange("yesterday"),
      lastWeekTransactionData: getTransactionDataByDateRange("lastWeek"),
      lastMonthTransactionData: getTransactionDataByDateRange("lastMonth"),
      last3MonthsTransactionData: [],
      otherTransactionData: [],
    }));
    console.log("hoosolloo");
  };
  const last3MonthsCarousel = () => {
    setFilteredTransactionDataByDate((prev) => ({
      ...prev,
      todayTransactionData: getTransactionDataByDateRange("today"),
      yesterdayTransactionData: getTransactionDataByDateRange("yesterday"),
      lastWeekTransactionData: getTransactionDataByDateRange("lastWeek"),
      lastMonthTransactionData: getTransactionDataByDateRange("lastMonth"),
      last3MonthsTransactionData: getTransactionDataByDateRange("last3Months"),
      otherTransactionData: [],
    }));
    console.log("hoosolloo");
  };
  const allCarousel = () => {
    setFilteredTransactionDataByDate((prev) => ({
      ...prev,
      todayTransactionData: getTransactionDataByDateRange("today"),
      yesterdayTransactionData: getTransactionDataByDateRange("yesterday"),
      lastWeekTransactionData: getTransactionDataByDateRange("lastWeek"),
      lastMonthTransactionData: getTransactionDataByDateRange("lastMonth"),
      last3MonthsTransactionData: getTransactionDataByDateRange("last3Months"),
      otherTransactionData: getTransactionDataByDateRange(
        "otherTransactionData"
      ),
    }));
    console.log("hoosolloo");
  };
  // Function to handle "Select All" checkbox change
  const handleSelectAllChange = (event) => {
    console.log(event.target.checked);
    const isChecked = event.target.checked;
    setAllSelected(isChecked);

    if (isChecked) {
      // Select all items
      setSelectedItems(filteredData.map((item) => item.id));

      console.log(selectedItems, "all selected items");
    } else if (!isChecked) {
      // Deselect all items
      setSelectedItems([]);
      setAllSelected(null);
      console.log(selectedItems, "all unselected items");
    }
  };

  const handleCheckboxChange = (event, itemId) => {
    console.log(event.target.checked, "event.target.checked checkbox");
    const isChecked = event.target.checked;
    console.log(selectedItems, "selecteditems before checkbox");

    setSelectedItems((prev) => {
      // Ensure prev is an array before attempting to filter it
      if (!Array.isArray(prev)) {
        console.error("prev is not an array:", prev);
        return prev; // Return the current state if prev is not an array
      }

      if (isChecked) {
        return [...prev, itemId];
      } else if (!isChecked) {
        if (allSelected) {
          setAllSelected(null);
          // prev.filter((id) => id !== itemId)
          return [];
        } else {
          return prev.filter((id) => id !== itemId);
        }
      }
    });

    console.log(selectedItems, "selecteditems after checkbox");
    console.log("handlecheckbox ajilchlo");
  };
  const deleteTransactionData = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_ENDPOINT}/api/transaction/delete`,
        {
          method: "POST",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedItems),
        }
      ).then((res) => res.json());
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData("category");
    // fetchData("transaction");
  }, []);
  useEffect(() => {
    fetchData("transaction");
  }, [newTransactionData]);
  useEffect(() => {
    console.log("useeffect ajillaa");
  }, [filterNewOrOld]);
  useEffect(() => {
    if (filteredData) {
      setFilteredTransactionDataByDate((prev) => ({
        ...prev,
        todayTransactionData: getTransactionDataByDateRange("today"),
        yesterdayTransactionData: getTransactionDataByDateRange("yesterday"),
        lastWeekTransactionData: getTransactionDataByDateRange("lastWeek"),
        lastMonthTransactionData: getTransactionDataByDateRange("lastMonth"),
        last3MonthsTransactionData:
          getTransactionDataByDateRange("last3Months"),
        otherTransactionData: getTransactionDataByDateRange(
          "otherTransactionData"
        ),
      }));
    }
  }, [filteredData]);
  useEffect(() => {
    addCategoryData(newCategoryData);
  }, [newCategoryData]);
  // useEffect(() => {
  //   addTransactionData(newTransactionData);
  // }, [newTransactionData]);

  useEffect(() => {
    filterTransactionDataByAttribute();
  }, [filterAttribute, filterAttribute.search]);

  return (
    <div className=" bg-gray-100">
      <div className="h-[92vh] py-5 flex gap-5 max-w-screen-lg m-auto">
        <div className="w-[25%] bg-white rounded-xl px-5 py-3 flex flex-col gap-[2%]">
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl font-semibold">Records</h1>
            <button
              onClick={() => setShowAddRecordPopUp(true)}
              className="w-full rounded-full bg-blue-600 h-8 text-white hover:bg-blue-700 active:scale-95"
            >
              {" "}
              + Add{" "}
            </button>
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-full max-w-xs h-8"
              onChange={(event) => {
                setFilterAttribute((prev) => ({
                  ...prev,
                  search: event.target.value,
                }));
              }}
            />
          </div>
          <div>
            <p className="font-medium">Types</p> {" "}
            <input
              type="radio"
              className="form-radio accent-blue-700"
              id="all"
              value="ALL"
              checked={filterAttribute.selectedType === "ALL"}
              onChange={(e) =>
                setFilterAttribute((prev) => ({
                  ...prev,
                  selectedType: e.target.value,
                }))
              }
            />
              <label htmlFor="all">All</label>
            <br /> {" "}
            <input
              type="radio"
              id="income"
              value="INC"
              className="form-radio accent-blue-700"
              checked={filterAttribute.selectedType === "INC"}
              onChange={(e) =>
                setFilterAttribute((prev) => ({
                  ...prev,
                  selectedType: e.target.value,
                }))
              }
            />
              <label htmlFor="income">Income</label>
            <br /> {" "}
            <input
              type="radio"
              id="expense"
              value="EXP"
              className="form-radio accent-blue-700"
              checked={filterAttribute.selectedType === "EXP"}
              onChange={(e) =>
                setFilterAttribute((prev) => ({
                  ...prev,
                  selectedType: e.target.value,
                }))
              }
            />
              <label htmlFor="expense">Expense</label>
          </div>
          <div className="h-[80%] overflow-auto">
            <p className="font-medium">Category</p>
            <div>
              {isLoadingFetchAllCategoryData && (
                <div className="w-full h-[200px] flex justify-center items-center ">
                  <span className="loading loading-spinner loading-md"></span>
                </div>
              )}
              {!isLoadingFetchAllCategoryData && (
                <div className="mt-2">
                  <div
                    onClick={() =>
                      setFilterAttribute((prevState) => ({
                        ...prevState,
                        selectedCatId: "",
                      }))
                    }
                    className="flex w-full pl-1 py-2 justify-between cursor-pointer items-center rounded-md hover:bg-gray-50 active:scale-95"
                  >
                    <p>All</p>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.9167 10.5833L9.75004 12.7499C9.48615 13.0138 9.18407 13.0729 8.84379 12.927C8.50351 12.7812 8.33337 12.5208 8.33337 12.1458V7.85411C8.33337 7.47911 8.50351 7.21869 8.84379 7.07286C9.18407 6.92702 9.48615 6.98605 9.75004 7.24994L11.9167 9.41661C12 9.49994 12.0625 9.59022 12.1042 9.68744C12.1459 9.78466 12.1667 9.88883 12.1667 9.99994C12.1667 10.1111 12.1459 10.2152 12.1042 10.3124C12.0625 10.4097 12 10.4999 11.9167 10.5833Z"
                        fill="#1C1B1F"
                      />
                    </svg>
                  </div>
                  {allCategoryData &&
                    allCategoryData.map((element) => {
                      if (allCategoryData.length === 0) {
                        return <div>Empty</div>;
                      } else {
                        const IconComponent =
                          iconComponentMap[element.category_image];

                        return (
                          <div
                            onClick={() =>
                              setFilterAttribute((prevState) => ({
                                ...prevState,
                                selectedCatId: element.id,
                              }))
                            }
                            key={element.id}
                            className="flex w-full pl-1 py-2 justify-between cursor-pointer items-center rounded-md hover:bg-gray-50 active:scale-95"
                          >
                            <div className="flex gap-3">
                              {" "}
                              {IconComponent && (
                                <IconComponent
                                  color={element.description}
                                  className="w-5 h-5"
                                />
                              )}
                              <p className="text-black">{element.name}</p>
                            </div>
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M11.9167 10.5833L9.75004 12.7499C9.48615 13.0138 9.18407 13.0729 8.84379 12.927C8.50351 12.7812 8.33337 12.5208 8.33337 12.1458V7.85411C8.33337 7.47911 8.50351 7.21869 8.84379 7.07286C9.18407 6.92702 9.48615 6.98605 9.75004 7.24994L11.9167 9.41661C12 9.49994 12.0625 9.59022 12.1042 9.68744C12.1459 9.78466 12.1667 9.88883 12.1667 9.99994C12.1667 10.1111 12.1459 10.2152 12.1042 10.3124C12.0625 10.4097 12 10.4999 11.9167 10.5833Z"
                                fill="#1C1B1F"
                              />
                            </svg>
                          </div>
                        );
                      }
                    })}
                </div>
              )}
            </div>
            {/* <button className="btn btn-ghost w-full">+ Add category</button> */}
          </div>
          <div className="flex flex-col gap-3">
            <p className="font-medium">Amount range</p>
            <div className="flex *:w-[49%] *:h-10 justify-between">
              <input
                type="number"
                placeholder="min"
                className="input input-bordered w-full max-w-xs "
                onChange={(event) => {
                  setMinRange(event.target.value);
                  setFilterAttribute((prevState) => ({
                    ...prevState,
                    rangeLow: event.target.value,
                  }));
                }}
              />
              <input
                type="number"
                placeholder="max"
                className="input input-bordered w-full max-w-xs"
                onChange={(event) => {
                  setMaxRange(event.target.value);
                  setFilterAttribute((prevState) => ({
                    ...prevState,
                    rangeHigh: event.target.value,
                  }));
                }}
              />
            </div>
            <div>
              <section>
                <input
                  className="w-full form-radio accent-blue-700"
                  type="range"
                  min={minRange}
                  max={maxRange}
                  step={100}
                  value={filterAttribute.rangeHigh}
                  onChange={(event) => {
                    setFilterAttribute((prevState) => ({
                      ...prevState,
                      rangeHigh: event.target.valueAsNumber,
                    }));
                  }}
                />
              </section>
              <div className="flex justify-between">
                <p>{minRange}</p>
                <p>{maxRange}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[75%] rounded-xl flex flex-col gap-[1%]">
          <div className="w-full h-[6%] flex justify-between">
            <div className="w-[200px]">
              <div className="carousel w-full h-full mr-10">
                <div id="slide1" className="carousel-item relative w-full">
                  <div className="w-full flex items-center justify-center">
                    All
                  </div>
                  <div className="absolute flex justify-between transform -translate-y-1/2 w-full left-0 right-0 top-1/2">
                    <a
                      onClick={last3MonthsCarousel}
                      href="#slide4"
                      className="btn btn-square scale-50 bg-gray-300"
                    >
                      ❮
                    </a>
                    <a
                      onClick={lastWeekCarousel}
                      href="#slide2"
                      className="btn btn-square scale-50 bg-gray-300"
                    >
                      ❯
                    </a>
                  </div>
                </div>
                <div id="slide2" className="carousel-item relative w-full">
                  <div className="w-full flex items-center justify-center">
                    Last week
                  </div>
                  <div className="absolute flex justify-between transform -translate-y-1/2 w-full left-0 right-0 top-1/2">
                    <a
                      onClick={allCarousel}
                      href="#slide1"
                      className="btn btn-square scale-50 bg-gray-300"
                    >
                      ❮
                    </a>
                    <a
                      onClick={lastMonthCarousel}
                      href="#slide3"
                      className="btn btn-square scale-50 bg-gray-300"
                    >
                      ❯
                    </a>
                  </div>
                </div>
                <div id="slide3" className="carousel-item relative w-full">
                  <div className="w-full flex items-center justify-center">
                    Last month
                  </div>
                  <div className="absolute flex justify-between transform -translate-y-1/2 w-full left-0 right-0 top-1/2">
                    <a
                      onClick={lastWeekCarousel}
                      href="#slide2"
                      className="btn btn-square scale-50 bg-gray-300"
                    >
                      ❮
                    </a>
                    <a
                      onClick={last3MonthsCarousel}
                      href="#slide4"
                      className="btn btn-square scale-50 bg-gray-300"
                    >
                      ❯
                    </a>
                  </div>
                </div>
                <div id="slide4" className="carousel-item relative w-full">
                  <div className="w-full flex items-center justify-center">
                    Last 3 months
                  </div>
                  <div className="absolute flex justify-between transform -translate-y-1/2 w-full left-0 right-0 top-1/2">
                    <a
                      onClick={lastMonthCarousel}
                      href="#slide3"
                      className="btn btn-square scale-50 bg-gray-300"
                    >
                      ❮
                    </a>
                    <a
                      onClick={allCarousel}
                      href="#slide1"
                      className="btn btn-square scale-50 bg-gray-300"
                    >
                      ❯
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <p>{selectedItems?.length} selected record</p>
              <button
                onClick={deleteTransactionData}
                className="rounded-full w-[80px] bg-red-500 text-white text-sm h-[60%] active:scale-95"
              >
                Delete
              </button>
            </div>
            <div>
              <select
                onChange={(event) => {
                  setFilterNewOrOld(event.target.value);
                }}
                className="px-5 rounded-lg border w-full h-full font-semibold"
              >
                <option
                  value={"newest"}
                  className="hover:accent-blue-700"
                  defaultValue
                >
                  Newest first
                </option>
                <option value={"oldest"} className="bg-accent-blue-700">
                  Oldest first
                </option>
              </select>
            </div>
          </div>
          <div className=" w-full h-[93%] flex flex-col">
            {isLoadingFetchAllTransactionData && (
              <div className="w-full h-[200px] flex justify-center items-center ">
                <span className="loading loading-spinner loading-md"></span>
              </div>
            )}
            {!isLoadingFetchAllTransactionData && (
              <div className=" flex flex-col overflow-auto gap-6 h-full">
                <div className="w-full flex justify-between items-center rounded-xl bg-white px-4">
                  <div className="h-[40px] flex items-center">
                    <input
                      type="checkbox"
                      className="mr-3"
                      checked={allSelected}
                      onChange={handleSelectAllChange}
                    />
                    <label htmlFor="">Select all</label>
                  </div>

                  <p className="">{balance}</p>
                </div>
                {filterNewOrOld === "newest" && (
                  <div className="flex flex-col gap-5 overflow-auto h-full">
                    <TransactionDataByDate
                      date={"Today"}
                      transactionData={
                        filteredTransactionDataByDate.todayTransactionData
                      }
                      filterAttribute={filterAttribute}
                      allSelected={allSelected}
                      handleCheckboxChange={handleCheckboxChange}
                    />
                    <TransactionDataByDate
                      date={"Yesterday"}
                      transactionData={
                        filteredTransactionDataByDate.yesterdayTransactionData
                      }
                      filterAttribute={filterAttribute}
                      allSelected={allSelected}
                      handleCheckboxChange={handleCheckboxChange}
                    />
                    <TransactionDataByDate
                      date={"Last week"}
                      transactionData={
                        filteredTransactionDataByDate.lastWeekTransactionData
                      }
                      filterAttribute={filterAttribute}
                      allSelected={allSelected}
                      handleCheckboxChange={handleCheckboxChange}
                    />
                    <TransactionDataByDate
                      date={"Last month"}
                      transactionData={
                        filteredTransactionDataByDate.lastMonthTransactionData
                      }
                      filterAttribute={filterAttribute}
                      allSelected={allSelected}
                      handleCheckboxChange={handleCheckboxChange}
                    />
                    <TransactionDataByDate
                      date={"Last 3 months"}
                      transactionData={
                        filteredTransactionDataByDate.last3MonthsTransactionData
                      }
                      filterAttribute={filterAttribute}
                      allSelected={allSelected}
                      handleCheckboxChange={handleCheckboxChange}
                    />
                    <TransactionDataByDate
                      date={"Other transaction"}
                      transactionData={
                        filteredTransactionDataByDate.otherTransactionData
                      }
                      filterAttribute={filterAttribute}
                      allSelected={allSelected}
                      handleCheckboxChange={handleCheckboxChange}
                    />
                  </div>
                )}
                {filterNewOrOld === "oldest" && (
                  <div className="flex flex-col gap-5 overflow-auto h-full">
                    <TransactionDataByDate
                      date={"Other transaction"}
                      transactionData={
                        filteredTransactionDataByDate.otherTransactionData
                      }
                      filterAttribute={filterAttribute}
                      allSelected={allSelected}
                      handleCheckboxChange={handleCheckboxChange}
                    />
                    <TransactionDataByDate
                      date={"Last 3 months"}
                      transactionData={
                        filteredTransactionDataByDate.last3MonthsTransactionData
                      }
                      filterAttribute={filterAttribute}
                      allSelected={allSelected}
                      handleCheckboxChange={handleCheckboxChange}
                    />
                    <TransactionDataByDate
                      date={"Last month"}
                      transactionData={
                        filteredTransactionDataByDate.lastMonthTransactionData
                      }
                      filterAttribute={filterAttribute}
                      allSelected={allSelected}
                      handleCheckboxChange={handleCheckboxChange}
                    />
                    <TransactionDataByDate
                      date={"Last week"}
                      transactionData={
                        filteredTransactionDataByDate.lastWeekTransactionData
                      }
                      filterAttribute={filterAttribute}
                      allSelected={allSelected}
                      handleCheckboxChange={handleCheckboxChange}
                    />
                    <TransactionDataByDate
                      date={"Yesterday"}
                      transactionData={
                        filteredTransactionDataByDate.yesterdayTransactionData
                      }
                      filterAttribute={filterAttribute}
                      allSelected={allSelected}
                      handleCheckboxChange={handleCheckboxChange}
                    />
                    <TransactionDataByDate
                      date={"Today"}
                      transactionData={
                        filteredTransactionDataByDate.todayTransactionData
                      }
                      filterAttribute={filterAttribute}
                      allSelected={allSelected}
                      handleCheckboxChange={handleCheckboxChange}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
