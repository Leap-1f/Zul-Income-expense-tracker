import { CashCard } from "./CashCard";
import { BarChart, DoughnutChart } from "./Chart";
import { TotalBox } from "./TotalBox";
import { useEffect, useState } from "react";
import { iconComponentMap } from "../utils/CategoryIcons";
import { useContext } from "react";
import { Context } from "../utils/context";
import moment from "moment";
export const Dashboard = () => {
  const {
    balance,
    setBalance,
    totalIncAmount,
    setTotalIncAmount,
    totalExpAmount,
    setTotalExpAmount,
  } = useContext(Context);
  const [allTransactionData, setAllTransactionData] = useState();
  const [
    isLoadingFetchAllTransactionData,
    setIsLoadingFetchAllTransactionData,
  ] = useState(false);

  // const userBalance = async () => {
  //   const userId = localStorage.getItem("id");
  //   try {
  //     const res = await fetch(
  //       `${process.env.NEXT_PUBLIC_ENDPOINT}/api/user/getbalance`,
  //       {
  //         method: "POST",
  //         cache: "no-cache",
  //         credentials: "same-origin",
  //         headers: {
  //           Accept: "application/json, text/plain, */*",
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ id: userId }),
  //       }
  //     ).then((res) => res.json());
  //     console.log(res, "resamount");
  //     setBalance(res[0].amount === null ? 0 : res[0].amount);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  const userTransactionTypeAndAmount = async () => {
    const userId = localStorage.getItem("id");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_ENDPOINT}/api/transaction/get-amount`,
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
      console.log(res, "resamounttypeee");
      const expAmount = res.filter((el) => el.transaction_type == "EXP");
      let totalExpAmount = 0;

      expAmount.forEach((el) => {
        if (el.transaction_type === "EXP") {
          totalExpAmount += el.amount;
        }
      });
      setTotalExpAmount(totalExpAmount);
      const incAmount = res.filter((el) => el.transaction_type == "INC");
      let totalIncAmount = 0;

      incAmount.forEach((el) => {
        if (el.transaction_type === "INC") {
          totalIncAmount += el.amount;
        }
      });
      setTotalIncAmount(totalIncAmount);
      console.log(expAmount, "expAmount");
      console.log(incAmount, "incAmount");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    // userBalance();
    userTransactionTypeAndAmount();
  }, []);
  const fetchAllTransactionData = async () => {
    const userId = localStorage.getItem("id");
    try {
      setIsLoadingFetchAllTransactionData(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_ENDPOINT}/api/transaction`,
        {
          method: "POST",
          cache: "no-cache",
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: userId }),
        }
      ).then((res) => res.json());

      setAllTransactionData(res);
      console.log(allTransactionData, "hellooo");
      setIsLoadingFetchAllTransactionData(false);
      console.log(isLoadingFetchAllTransactionData);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(allTransactionData);
  useEffect(() => {
    fetchAllTransactionData();
  }, []);

  allTransactionData?.sort((a, b) => {
    const aDate = moment(`${a.transaction_date}`)
      .add(`${a.transaction_time}`)
      .format();
    const bDate = moment(`${b.transaction_date}`)
      .add(`${b.transaction_time}`)
      .format();
    return new Date(bDate) - new Date(aDate);
  });

  const latestTenDates = allTransactionData?.slice(0, 10);

  return (
    <div className="h-full flex flex-col justify-between gap-3 py-6">
      <div className="flex justify-between h-[25%]">
        <CashCard balance={balance} />
        <TotalBox
          color={"green"}
          title={"Your income"}
          description={"Your income amount"}
          totalAmount={totalIncAmount}
          procent={30}
        />
        <TotalBox
          color={"blue"}
          title={"Total Expenses"}
          description={"Your expense amount"}
          totalAmount={totalExpAmount}
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
          <div className="lg:h-[200px] h-[250px] w-full absolute top-[0px]">
            <DoughnutChart />
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl h-[500px] overflow-auto">
        <p className="p-3 font-bold">Last records</p>
        {isLoadingFetchAllTransactionData && (
          <div className="w-full h-[200px] flex justify-center items-center ">
            <span className="loading loading-spinner loading-md"></span>
          </div>
        )}
        {!isLoadingFetchAllTransactionData && (
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
                      <div className="flex items-center w-full gap-3 rounded-t-md ">
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
                            {moment(
                              transactionDateAndTime,
                              "YYYYMMDD"
                            ).fromNow()}
                          </p>
                        </div>
                      </div>
                    </div>

                    <p>
                      {element.transaction_type === "INC"
                        ? element.amount
                        : -element.amount}
                      ₮
                    </p>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};
