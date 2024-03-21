import { CashCard } from "./CashCard";
import { BarChart, DoughnutChart } from "./Chart";
import { TotalBox } from "./TotalBox";
import { useEffect, useState } from "react";
import { iconComponentMap } from "../utils/CategoryIcons";
export const Dashboard = () => {
  const [allTransactionData, setAllTransactionData] = useState();
  const fetchAllCategoryData = async () => {
    try {
      // setIsLoadingFetchAllTransactionData(true);
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

      // setIsLoadingFetchAllTransactionData(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchAllCategoryData();
  }, []);

  // Sort the array in descending order
  allTransactionData?.sort(
    (a, b) => new Date(b.createdat) - new Date(a.createdat)
  );

  // Get the latest 5 dates
  const latestTenDates = allTransactionData?.slice(0, 10);

  function relativeTime(dateString) {
    const ONE_SECOND = 1000;
    const ONE_MINUTE = 1000 * 60;
    const ONE_HOUR = ONE_MINUTE * 60;
    const ONE_DAY = ONE_HOUR * 24;
    const ONE_WEEK = ONE_DAY * 7;
    const ONE_MONTH = ONE_DAY * 30; // Approximation
    const ONE_YEAR = ONE_DAY * 365; // Approximation

    const currentDate = new Date();
    const inputDate = new Date(dateString);
    const differenceInTime = currentDate.getTime() - inputDate.getTime();

    if (differenceInTime < ONE_MINUTE) {
      return Math.floor(differenceInTime / ONE_SECOND) + "seconds ago";
    } else if (differenceInTime < ONE_HOUR) {
      if (Math.floor(differenceInTime / ONE_MINUTE) === 1) {
        return Math.floor(differenceInTime / ONE_MINUTE) + "minute ago";
      } else {
        return Math.floor(differenceInTime / ONE_MINUTE) + "minutes ago";
      }
    } else if (differenceInTime < ONE_DAY) {
      if (Math.floor(differenceInTime / ONE_HOUR) === 1) {
        return Math.floor(differenceInTime / ONE_HOUR) + " hour ago";
      } else {
        return Math.floor(differenceInTime / ONE_HOUR) + " hours ago";
      }
    } else if (differenceInTime < ONE_WEEK) {
      if (Math.floor(differenceInTime / ONE_DAY) === 1) {
        return Math.floor(differenceInTime / ONE_DAY) + " day ago";
      } else {
        return Math.floor(differenceInTime / ONE_DAY) + " days ago";
      }
    } else if (differenceInTime < ONE_MONTH) {
      if (Math.floor(differenceInTime / ONE_WEEK) === 1) {
        return Math.floor(differenceInTime / ONE_WEEK) + " week ago";
      } else {
        return Math.floor(differenceInTime / ONE_WEEK) + " weeks ago";
      }
    } else if (differenceInTime < ONE_YEAR) {
      if (Math.floor(differenceInTime / ONE_MONTH)) {
        return Math.floor(differenceInTime / ONE_MONTH) + " month ago";
      } else {
        return Math.floor(differenceInTime / ONE_MONTH) + " months ago";
      }
    } else {
      // Calculate the difference in years more accurately
      const diffInYears = Math.abs(Math.round(differenceInTime / ONE_YEAR));
      return diffInYears + " years ago";
    }
  }

  return (
    <div className="h-full flex flex-col justify-between gap-3 py-6">
      <div className="flex justify-between h-[25%]">
        <CashCard />
        <TotalBox
          color={"green"}
          title={"Your income"}
          description={"Your income amount"}
          totalAmount={"12000000"}
          procent={30}
        />
        <TotalBox
          color={"blue"}
          title={"Total Expenses"}
          description={"Your expense amount"}
          totalAmount={"-12000000"}
          procent={30}
        />
      </div>
      <div className="flex gap-5 h-[27%] *:w-1/2">
        <div className="bg-white rounded-xl lg:h-full p-3 flex flex-col gap-3">
          <div className="font-bold border-b h-[10%]">Income - Expense</div>
          <div className="h-[90%] w-full">
            <BarChart />
          </div>
        </div>
        <div className="bg-white rounded-xl lg:h-full lg:relative p-3 flex flex-col gap-3">
          <div className="font-bold border-b h-[10%]">Income - Expense</div>
          <div className="lg:h-[230px] w-full lg:absolute -top-3">
            <DoughnutChart />
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl h-[500px] overflow-auto">
        <p className="p-3 font-bold">Last records</p>
        <div className="px-5 overflow-auto">
          {latestTenDates &&
            latestTenDates.map((element) => {
              const date = new Date(`${element.createdat}`);
              const IconComponent = iconComponentMap[element.category_image];
              // getRelativeTime(date);
              return (
                <div
                  key={element.id}
                  className="w-full flex justify-between items-center h-15 bg-white py-3 border-t"
                >
                  <div className="flex items-center">
                    {/* <input type="checkbox" className="mr-3" /> */}
                    <div
                      // onClick={() => handleSelectCategory(element)}

                      className="flex items-center w-full gap-3 rounded-t-md "
                    >
                      <div
                        style={{ background: `${element.category_color}` }}
                        className=" rounded-full w-7 h-7 flex items-center justify-center"
                      >
                        {IconComponent && (
                          <IconComponent color="white" className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <p className="text-black">{element.category_name}</p>
                        <p className="text-gray-400 text-sm">
                          {relativeTime(element.createdat)}
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
  );
};
