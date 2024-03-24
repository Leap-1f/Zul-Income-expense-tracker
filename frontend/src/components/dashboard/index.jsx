import { CashCard } from "./CashCard";
import { BarChart, DoughnutChart } from "./Chart";
import { TotalBox } from "./TotalBox";
import { useEffect, useState } from "react";
import { iconComponentMap } from "../utils/CategoryIcons";
import moment from "moment";
export const Dashboard = () => {
  const [allTransactionData, setAllTransactionData] = useState();
  const [isLoadingFetchAllTransactionData, setIsLoadingFetchAllTransactionData] = useState(false)
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
  console.log(allTransactionData);
  useEffect(() => {
    fetchAllCategoryData();
  }, []);

  allTransactionData?.sort((a, b) => {
    const aDate = moment(
      `${a.transaction_date}`
    ).add(`${a.transaction_time}`).format();
    const bDate = moment(
      `${b.transaction_date}`
      ).add(`${b.transaction_time}`).format();
    return new Date(bDate) - new Date(aDate);
  });

  const latestTenDates = allTransactionData?.slice(0, 10);


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
          <div className="font-bold border-b h-[10%] ">Income - Expense</div>
          <div className="h-[90%] w-full">
            <BarChart />
          </div>
        </div>
        <div className="bg-white rounded-xl lg:h-full relative p-3 flex flex-col gap-3">
          <div className="font-bold border-b h-[10%]">Expense</div>
          <div className="lg:h-[230px] h-[250px] w-full absolute top-[0px]">
            <DoughnutChart />
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl h-[500px] overflow-auto">
        <p className="p-3 font-bold">Last records</p>
        <div className="px-5 overflow-auto">
          {latestTenDates &&
            latestTenDates.map((element) => {
              const datePart = element.transaction_date?.split("T")[0];
        const transactionDateAndTime = moment(
          `${datePart} ${element.transaction_time}`
        ).format();
              const IconComponent = iconComponentMap[element.category_image];
              return (
                <div
                  key={element.id}
                  className="w-full flex justify-between items-center h-15 bg-white py-3 border-t"
                >
                  <div className="flex items-center">
                    <div
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
                          {moment(transactionDateAndTime, "YYYYMMDD").fromNow()}
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
