import { useEffect, useState } from "react";
import { iconComponentMap } from "../utils/CategoryIcons";
import { useContext } from "react";
import { Context } from "../utils/context";

export const Record = ({ setShowAddRecordPopUp }) => {
  let { selectedCategoryData } = useContext(Context);
  const [minRange, setMinRange] = useState(0);
  const [maxRange, setMaxRange] = useState(10000);
  const [allCategoryData, setAllCategoryData] = useState();
  const [allTransactionData, setAllTransactionData] = useState();
  const [isLoadingFetchAllCategoryData, setIsLoadingFetchAllCategoryData] =
    useState(false);
  const [
    isLoadingFetchAllTransactionData,
    setIsLoadingFetchAllTransactionData,
  ] = useState(false);

  const fetchAllTransactionData = async () => {
    try {
      setIsLoadingFetchAllTransactionData(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_ENDPOINT}/api/transaction`,
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

      setAllTransactionData(res);
      setIsLoadingFetchAllTransactionData(false);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchAllCategoryData = async () => {
    try {
      setIsLoadingFetchAllCategoryData(true);
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

      setAllCategoryData(res);
      if(selectedCategoryData.length  !== 0){
        addCategoryData(selectedCategoryData)
      }
      setIsLoadingFetchAllCategoryData(false);
    } catch (err) {
      console.log(err);
    }
  };
  const addCategoryData = (newData) => {
    console.log(newData, "its new data");
    allCategoryData?.push(newData)
    // setAllCategoryData((prev) => [...prev, newData]);

    console.log("its category data", allCategoryData);
  };
  console.log(selectedCategoryData);
 

  const arr = [
    { name: "1honog", date: "2024-03-19 09:23:00" },
    { name: "1henhonog", date: "2024-03-19 09:00:00" },
    { name: "2honog", date: "2024-03-18 09:23:00" },
    { name: "2honog", date: "2024-03-18 09:29:00" },
    { name: "7honog", date: "2024-03-13 09:29:00" },
    { name: "7hhhonog", date: "2024-03-13 09:29:00" },
  ];
  // Function to parse date strings into Date objects
  const parseDate = (dateString) => new Date(dateString);

  // Function to check if a date is from "yesterday"
  const isYesterday = (date) => {
    const now = new Date();
    const yesterday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 1
    );
    return date.setHours(0, 0, 0, 0) === yesterday.setHours(0, 0, 0, 0);
  };

  // Function to check if a date is from "today"
  const isToday = (date) => {
    const now = new Date();
    return date.setHours(0, 0, 0, 0) === now.setHours(0, 0, 0, 0);
  };
  // Function to check if a date is within the last week (excluding today and yesterday)
  const isWithinLastWeek = (date) => {
    const now = new Date();
    const lastWeekStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 7
    );
    return date >= lastWeekStart && !isToday(date) && !isYesterday(date);
  };

  // Function to check if a date is within the last month (excluding the latest week's data)
  const isWithinLastMonth = (date) => {
    const now = new Date();
    const lastMonthStart = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    return (
      date >= lastMonthStart &&
      !isWithinLastWeek(date) &&
      !isToday(date) &&
      !isYesterday(date)
    );
  };
  const isWithinLast3Months = (date) => {
    const now = new Date();
    const lastMonthStart = new Date(
      now.getFullYear(),
      now.getMonth() - 3,
      now.getDate()
    );
    return (
      date >= lastMonthStart &&
      !isWithinLastMonth(date) &&
      !isWithinLastWeek(date) &&
      !isToday(date) &&
      !isYesterday(date)
    );
  };
  // Separate the data into "yesterday" and "today"
  const yesterdayTransactionData = allTransactionData
    ?.filter((item) => isYesterday(parseDate(item.createdat)))
    .sort((a, b) => parseDate(a.createdat) - parseDate(b.createdat));
  const todayTransactionData = allTransactionData
    ?.filter((item) => isToday(parseDate(item.createdat)))
    .sort((a, b) => parseDate(a.createdat) - parseDate(b.createdat));
  const lastWeekTransactionData = allTransactionData
    ?.filter((item) => isWithinLastWeek(parseDate(item.createdat)))
    .sort((a, b) => parseDate(a.createdat) - parseDate(b.createdat));
  const lastMonthTransactionData = allTransactionData
    ?.filter((item) => isWithinLastMonth(parseDate(item.createdat)))
    .sort((a, b) => parseDate(a.createdat) - parseDate(b.createdat));
  const last3MonthsTransactionData = allTransactionData
    ?.filter((item) => isWithinLast3Months(parseDate(item.createdat)))
    .sort((a, b) => parseDate(a.createdat) - parseDate(b.createdat));
  console.log("Yesterday's data:", yesterdayTransactionData);
  console.log("Today's data:", todayTransactionData);
  // console.log(allCategoryData);

  // // Sort the array in descending order
  // allTransactionData?.sort(
  //   (a, b) => new Date(b.createdat) - new Date(a.createdat)
  // );

  // // Get the latest 5 dates
  // const latestTenDates = allTransactionData?.slice(0, 10);
  useEffect(() => {
    fetchAllCategoryData();
    fetchAllTransactionData();
  }, []);
  useEffect(() => {
addCategoryData()
  },[selectedCategoryData])
  const extractHourMinute = (dateString) => {
    const dateObj = new Date(dateString);
    const hour = dateObj.getHours();
    const minute = dateObj.getMinutes();
    return `${hour}:${minute}`;
  };

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
            />
          </div>
          <div>
            <p className="font-medium">Types</p> {" "}
            <input
              type="radio"
              class="form-radio accent-blue-700"
              id="html"
              name="fav_language"
              value="HTML"
            />
              <label for="html">All</label>
            <br /> {" "}
            <input
              type="radio"
              id="css"
              name="fav_language"
              value="CSS"
              class="form-radio accent-blue-700"
            />
              <label for="css">Income</label>
            <br /> {" "}
            <input
              type="radio"
              id="javascript"
              name="fav_language"
              value="JavaScript"
              class="form-radio accent-blue-700"
            />
              <label for="javascript">Expense</label>
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
                  {allCategoryData &&
                    allCategoryData.map((element) => {
                      if (allCategoryData.length === 0) {
                        return <div>Empty</div>;
                      } else {
                        const IconComponent =
                          iconComponentMap[element.category_image];

                        return (
                          <div
                            // onClick={() => handleSelectCategory(element)}
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
                type="text"
                placeholder="min"
                className="input input-bordered w-full max-w-xs "
                onChange={(event) => {
                  setMinRange(event.target.value);
                }}
              />
              <input
                type="text"
                placeholder="max"
                className="input input-bordered w-full max-w-xs"
                onChange={(event) => {
                  setMaxRange(event.target.value);
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
                  step={10}
                  // value={volume}
                  // onChange={(event) => {
                  //   setVolume(event.target.valueAsNumber);
                  // }}
                />
                {/* <button onClick={() => setMuted(m => !m)}>
          {muted ? "muted" : "unmuted"}
        </button> */}
              </section>
              <div className="flex justify-between">
                <p>{minRange}</p>
                <p>{maxRange}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[75%] rounded-xl flex flex-col gap-[1%]">
          <div className="bg-blue-200 w-full h-[6%]"></div>
          <div className=" w-full h-[93%] flex flex-col">
            {isLoadingFetchAllTransactionData && (
              <div className="w-full h-[200px] flex justify-center items-center ">
                <span className="loading loading-spinner loading-md"></span>
              </div>
            )}
            {!isLoadingFetchAllTransactionData && (
              <div className=" flex flex-col gap-6 overflow-auto">
                <div className="w-full flex justify-between items-center rounded-xl h-[48px] bg-white px-4">
                  <div className="">
                    <input type="checkbox" className="mr-3" />
                    <label htmlFor="">Select all</label>
                  </div>

                  <p className="">35500₮</p>
                </div>
                <div className="flex flex-col gap-5 overflow-auto">
                  <div>
                    <p className="mb-3 font-semibold">Today</p>
                    <div className="flex flex-col gap-2">
                      {todayTransactionData &&
                        todayTransactionData.map((element) => {
                          const IconComponent =
                            iconComponentMap[element.category_image];

                          return (
                            <div
                              key={element.id}
                              className="w-full flex justify-between items-center rounded-xl h-12 bg-white px-4"
                            >
                              <div className="flex items-center">
                                <input type="checkbox" className="mr-3" />
                                <div
                                  // onClick={() => handleSelectCategory(element)}

                                  className="flex items-center w-full gap-3 rounded-t-md "
                                >
                                  <div
                                    style={{
                                      background: `${element.category_color}`,
                                    }}
                                    className=" rounded-full w-7 h-7 flex items-center justify-center"
                                  >
                                    {IconComponent && (
                                      <IconComponent
                                        color="white"
                                        className="w-5 h-5"
                                      />
                                    )}
                                  </div>
                                  <div>
                                    <p className="text-black">
                                      {element.category_name}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                      {extractHourMinute(element.createdat)}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                      {element.createdat}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <p>
                                {element.transaction_type === "INC"
                                  ? element.amount
                                  : -element.amount}₮
                              </p>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                  <div>
                    <p className="mb-3 font-semibold">Yesterday</p>
                    <div className="flex flex-col gap-2">
                      {yesterdayTransactionData &&
                        yesterdayTransactionData.map((element) => {
                          const IconComponent =
                            iconComponentMap[element.category_image];
                          return (
                            <div
                              key={element.id}
                              className="w-full flex justify-between items-center rounded-xl h-12 bg-white px-4"
                            >
                              <div className="flex items-center">
                                <input type="checkbox" className="mr-3" />
                                <div
                                  // onClick={() => handleSelectCategory(element)}

                                  className="flex items-center w-full gap-3 rounded-t-md "
                                >
                                  <div
                                    style={{
                                      background: `${element.category_color}`,
                                    }}
                                    className=" rounded-full w-7 h-7 flex items-center justify-center"
                                  >
                                    {IconComponent && (
                                      <IconComponent
                                        color="white"
                                        className="w-5 h-5"
                                      />
                                    )}
                                  </div>
                                  <div>
                                    <p className="text-black">
                                      {element.category_name}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                      {extractHourMinute(element.createdat)}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <p>
                                {element.transaction_type === "INC"
                                  ? element.amount
                                  : -element.amount}₮
                              </p>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                  <div>
                    <p className="mb-3 font-semibold">A week ago</p>
                    <div className="flex flex-col gap-2">
                      {lastWeekTransactionData &&
                        lastWeekTransactionData.map((element) => {
                          const IconComponent =
                            iconComponentMap[element.category_image];
                          return (
                            <div
                              key={element.id}
                              className="w-full flex justify-between items-center rounded-xl h-12 bg-white px-4"
                            >
                              <div className="flex items-center">
                                <input type="checkbox" className="mr-3" />
                                <div
                                  // onClick={() => handleSelectCategory(element)}

                                  className="flex items-center w-full gap-3 rounded-t-md "
                                >
                                  <div
                                    style={{
                                      background: `${element.category_color}`,
                                    }}
                                    className=" rounded-full w-7 h-7 flex items-center justify-center"
                                  >
                                    {IconComponent && (
                                      <IconComponent
                                        color="white"
                                        className="w-5 h-5"
                                      />
                                    )}
                                  </div>
                                  <div>
                                    <p className="text-black">
                                      {element.category_name}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                      {extractHourMinute(element.createdat)}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <p>
                                {element.transaction_type === "INC"
                                  ? element.amount
                                  : -element.amount}₮
                              </p>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                  <div>
                    <p className="mb-3 font-semibold">A month ago</p>
                    <div className="flex flex-col gap-2">
                      {lastMonthTransactionData &&
                        lastMonthTransactionData.map((element) => {
                          const IconComponent =
                            iconComponentMap[element.category_image];
                          return (
                            <div
                              key={element.id}
                              className="w-full flex justify-between items-center rounded-xl h-12 bg-white px-4"
                            >
                              <div className="flex items-center">
                                <input type="checkbox" className="mr-3" />
                                <div
                                  // onClick={() => handleSelectCategory(element)}

                                  className="flex items-center w-full gap-3 rounded-t-md "
                                >
                                  <div
                                    style={{
                                      background: `${element.category_color}`,
                                    }}
                                    className=" rounded-full w-7 h-7 flex items-center justify-center"
                                  >
                                    {IconComponent && (
                                      <IconComponent
                                        color="white"
                                        className="w-5 h-5"
                                      />
                                    )}
                                  </div>
                                  <div>
                                    <p className="text-black">
                                      {element.category_name}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                      {extractHourMinute(element.createdat)}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <p>
                                {element.transaction_type === "INC"
                                  ? element.amount
                                  : -element.amount}₮
                              </p>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                  <div>
                    <p className="mb-3 font-semibold">3 months ago</p>
                    <div className="flex flex-col gap-2">
                      {last3MonthsTransactionData &&
                        last3MonthsTransactionData.map((element) => {
                          const IconComponent =
                            iconComponentMap[element.category_image];
                          return (
                            <div
                              key={element.id}
                              className="w-full flex justify-between items-center rounded-xl h-12 bg-white px-4"
                            >
                              <div className="flex items-center">
                                <input type="checkbox" className="mr-3" />
                                <div
                                  // onClick={() => handleSelectCategory(element)}

                                  className="flex items-center w-full gap-3 rounded-t-md "
                                >
                                  <div
                                    style={{
                                      background: `${element.category_color}`,
                                    }}
                                    className=" rounded-full w-7 h-7 flex items-center justify-center"
                                  >
                                    {IconComponent && (
                                      <IconComponent
                                        color="white"
                                        className="w-5 h-5"
                                      />
                                    )}
                                  </div>
                                  <div>
                                    <p className="text-black">
                                      {element.category_name}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                      {extractHourMinute(element.createdat)}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <p>
                                {element.transaction_type === "INC"
                                  ? element.amount
                                  : -element.amount}₮
                              </p>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
