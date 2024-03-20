import { CashCard } from "./CashCard";
import { BarChart, DoughnutChart } from "./Chart";
import { TotalBox } from "./TotalBox";
export const Dashboard = () => {
  return (
    <div className="min-h-full flex flex-col justify-between py-6">
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
        <div className="bg-white rounded-xl lg:h-[280px] p-3 flex flex-col gap-3">
          <div className="font-bold border-b h-[10%]">Income - Expense</div>
          <div className="h-[90%] w-full">
            <BarChart />
          </div>
        </div>
        <div className="bg-white rounded-xl lg:h-[280px] p-3 flex flex-col gap-3">
          <div className="font-bold border-b h-[10%]">Income - Expense</div>
          <div className="lg:h-[230px] w-full">
            <DoughnutChart />
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl">
        <p className="border-b p-3 font-bold">Last records</p>
        <div></div>
      </div>
    </div>
  );
};
