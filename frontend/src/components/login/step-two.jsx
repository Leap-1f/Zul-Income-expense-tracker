import { IconStep2 } from "../utils/index";

export const StepTwo = () => {
  return (
    <div className="w-[500px] flex flex-col items-center gap-6">
    <div className="flex flex-col gap-4 items-center mb-4">
      <IconStep2></IconStep2>
      <h3 className="font-bold text-lg">Set up your cash Balance</h3>
    </div>
    <input
      type="text"
      placeholder="Amount"
      className="input input-bordered w-full max-w-xs"
    />
    <p className="text-gray-500 text-center">
      How much cash do you have in your wallet
    </p>
  </div>
  );
};
