import { IconStep3 } from "../utils/index";

export const StepThree = () => {
  return (
    <div className="w-[500px] flex flex-col items-center gap-6">
    <div className="flex flex-col gap-4 items-center mb-4">
      <IconStep3></IconStep3>
      <h3 className="font-bold text-lg">Good Job!</h3>
    </div>
    <p className="text-gray-500 text-center">
    Your very first account has been created. Now continue to dashboard and start tracking
    </p>
  </div>
  );
};
