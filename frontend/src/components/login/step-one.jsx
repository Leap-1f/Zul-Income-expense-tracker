import { IconStep1 } from "../utils/index";

export const StepOne = () => {
  return (
    <div className="w-[500px] flex flex-col items-center gap-6">
      <div className="flex flex-col gap-4 items-center mb-4">
        <IconStep1></IconStep1>
        <h3 className="font-bold text-lg">Select base currency</h3>
      </div>
      <select className="select select-bordered w-full max-w-xs">
        <option value="mnt">MNT-Mongolian Tugrik</option>
        <option value="usd">USD</option>
      </select>
      <p className="text-gray-500 text-center">
        Your base currency should be the one you use most often. All transaction
        in other currencies will be calculated based on this one{" "}
      </p>
    </div>
  );
};
