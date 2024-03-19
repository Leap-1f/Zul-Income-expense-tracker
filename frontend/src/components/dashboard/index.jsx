import { CashCard } from "./CashCard";
import { TotalBox } from "./TotalBox";
export const Dashboard = () => {

  return (
    <div className="h-full">
      <div className="flex justify-between h-[25%]">
        <CashCard />

        <TotalBox
          color={"green"}
          title={"Your income"}
          description={"Your income amount"}
          totalAmount={"12000000"}
          procent={30}
        />

        <TotalBox  color={"blue"}
          title={"Total Expenses"}
          description={"Your expense amount"}
          totalAmount={"12000000"}
          procent={30}
          />
           
      </div>
    </div>
  );
};
