import { CardShape, PayWave } from "../utils";
import { WhiteGeld } from "../utils/IconGeld";

export const CashCard = () => {
  return <div>
     <div className="w-[386px] h-[214px] bg-blue-500 rounded-xl p-8 relative">
          <div className=" flex flex-col h-full justify-between">
               <WhiteGeld width="80" height="30"/>
               <div>
                    <p className="text-gray-300">Cash</p>
                    <p className="text-xl text-white">10k</p>
               </div>
          </div>
     <div className="absolute z-2 bottom-0 right-0">
     <CardShape/>
     </div>
    <div className="absolute z-3 bottom-8 right-8"><PayWave/></div>
     
     </div>
     
  </div>;
};
