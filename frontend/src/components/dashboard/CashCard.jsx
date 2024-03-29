import { useContext, useEffect } from "react";
import { CardShape, PayWave } from "../utils";
import { WhiteGeld } from "../utils/IconGeld";

export const CashCard = ({ balance }) => {
  return (
    <div className="w-[33%] h-full">
      <div className="relative bg-blue-500 rounded-xl w-full h-full p-6">
        <div className=" flex flex-col h-full justify-center gap-10">
          <WhiteGeld width="80" height="30" />
          <div>
            <p className="text-gray-300">Cash</p>
            <p className="text-xl text-white">{balance}</p>
          </div>
        </div>
        <div className="absolute z-2 bottom-0 right-0">
          <CardShape />
        </div>
        <div className="absolute z-3 bottom-8 right-8">
          <PayWave />
        </div>
      </div>
    </div>
  );
};
