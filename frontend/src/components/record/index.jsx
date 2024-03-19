import { useEffect, useState } from "react";
import { iconComponentMap } from "../utils/CategoryIcons";

export const Record = ({ setShowAddRecordPopUp }) => {
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
  // // Create a relative time formatter for English
  // const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  // // Function to get relative time
  // const getRelativeTime = (date) => {
  //  const now = new Date();
  //  const elapsed = now - date; // Calculate the difference in milliseconds

  //  // Determine the unit of time to use based on the elapsed time
  //  const units = {
  //     year: 24 * 60 * 60 * 1000 * 365,
  //     month: 24 * 60 * 60 * 1000 * 365 / 12,
  //     day: 24 * 60 * 60 * 1000,
  //     hour: 60 * 60 * 1000,
  //     minute: 60 * 1000,
  //     second: 1000
  //  };

  //  for (const unit in units) {
  //   console.log(unit);
  //   console.log(Math.abs(elapsed));
  //   console.log(units[unit]);
  //     if (Math.abs(elapsed) >= units[unit] || unit === "second") {
  //       return rtf.format(Math.round(elapsed / units[unit]), unit);
  //     }
  //  }
  // };

  // // Example usage
  // const date = new Date('2024-02-17T00:00:00'); // Example date
  // console.log(getRelativeTime(date)); // Outputs relative time, e.g., "2 days ago"

  const fetchAllCategoryData = async () => {
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
  const fetchAllTransactionData = async () => {
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
      setIsLoadingFetchAllCategoryData(false);
    } catch (err) {
      console.log(err);
    }
  };
  const now = new Date();
  console.log(now);
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

  // Separate the data into "yesterday" and "today"
  const yesterdayTransactionData = allTransactionData
    ?.filter((item) => isYesterday(parseDate(item.createdat)))
    .sort((a, b) => parseDate(a.createdat) - parseDate(b.createdat));
  const todayTransactionData = allTransactionData
    ?.filter((item) => isToday(parseDate(item.createdat)))
    .sort((a, b) => parseDate(a.createdat) - parseDate(b.createdat));

  console.log("Yesterday's data:", yesterdayTransactionData);
  console.log("Today's data:", todayTransactionData);
  // console.log(allCategoryData);
  useEffect(() => {
    fetchAllCategoryData();
    fetchAllTransactionData();
  }, []);
  return (
    <div className=" bg-gray-100">
      <div className="h-[92vh] py-5 flex gap-5 max-w-screen-lg m-auto">
        <div className="w-[25%] bg-white rounded-xl px-5 py-3 flex flex-col gap-[2%]">
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl font-semibold">Records</h1>
            <button
              onClick={() => setShowAddRecordPopUp(true)}
              className="w-full rounded-full bg-blue-600 h-8 hover:bg-blue-700 active:scale-95"
            >
              {" "}
              + Add{" "}
            </button>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs h-8"
            />
          </div>
          <div>
            <p className="font-medium">Types</p> {" "}
            <input type="radio" id="html" name="fav_language" value="HTML" /> {" "}
            <label for="html">All</label>
            <br /> {" "}
            <input
              type="radio"
              id="css"
              name="fav_language"
              value="CSS"
            />  <label for="css">Income</label>
            <br /> {" "}
            <input
              type="radio"
              id="javascript"
              name="fav_language"
              value="JavaScript"
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
                            onClick={() => handleSelectCategory(element)}
                            key={element.id}
                            className="flex w-full pb-2 gap-3 rounded-t-md hover:bg-gray-50 active:scale-95"
                          >
                            {IconComponent && (
                              <IconComponent
                                color={element.description}
                                className="w-5 h-5"
                              />
                            )}
                            <p className="text-black">{element.name}</p>
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
                className="input input-bordered w-full max-w-xs"
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
                  className="w-full"
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
        <div className="w-[75%] bg-green-200 rounded-xl flex flex-col gap-[1%]">
          <div className="bg-blue-200 w-full h-[6%]"></div>
          <div className="bg-yellow-200 w-full h-[93%] flex flex-col">
            {isLoadingFetchAllTransactionData && (
              <div className="w-full h-[200px] flex justify-center items-center ">
                <span className="loading loading-spinner loading-md"></span>
              </div>
            )}
            {!isLoadingFetchAllTransactionData && (
              <div className=" flex flex-col gap-6">
                <div className="w-full flex justify-between items-center rounded-xl h-12 bg-white px-4">
                  <div className="">
                    <input type="checkbox" className="mr-3" />
                    <label htmlFor="">Select all</label>
                  </div>

                  <p>35500</p>
                </div>
                <div className="flex flex-col gap-5 overflow-auto">
                  <div>
                    <p className="mb-3">Today</p>
                    <div className="flex flex-col gap-2">
                      {todayTransactionData &&
                        todayTransactionData.map((element) => {
                          // const IconComponent =
                          // iconComponentMap[element.category_image];
                          return (
                            <div
                              key={element.id}
                              className="w-full flex justify-between items-center rounded-xl h-12 bg-white px-4"
                            >
                              <div className="flex items-center">
                                <input type="checkbox" className="mr-3" />
                                <div
                                  // onClick={() => handleSelectCategory(element)}

                                  className="flex w-full gap-3 rounded-t-md "
                                >
                                  {/* {IconComponent && (
                              <IconComponent
                                color={element.description}
                                className="w-5 h-5"
                              />
                            )} */}
                                  <div>icon</div>
                                  <p className="text-black">{element.name}</p>
                                </div>
                              </div>

                              <p>
                                {element.transaction_type === "INC"
                                  ? element.amount
                                  : -element.amount}
                              </p>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                  <div>
                    <p>Yesterday</p>
                  </div>
                  <div>
                    <p>A week ago</p>
                  </div>
                  <div>
                    <p>A month ago</p>
                  </div>
                  <div>
                    <p>3 months ago</p>
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
