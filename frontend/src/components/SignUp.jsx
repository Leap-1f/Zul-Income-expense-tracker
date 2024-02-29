import { useState, useStepper } from "react";
import { Geld } from "./utils/IconGeld";

import React from "react";
import Stepper from "../components/Stepper";
import { IconStep1 } from "./utils/IconStep1";
import { IconStep2 } from "./utils/IconStep2";
import { IconStep3 } from "./utils/IconStep3";

export const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [currentStep, setCurrentStep] = useState(0);
  const numberOfSteps = 3;
  let nextStep = "Confirm";
  if (currentStep === 2) {
    nextStep = "Go to Dashboard";
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-[100vh]">
        <div className="flex flex-col justify-center items-center gap-8">
          <Geld width="200" heigth="80"></Geld>
          <div className="flex flex-col justify-center items-center gap-2">
            <div class="loading loading-spinner loading-md"></div>
            <p>Түр хүлээнэ үү...</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center h-[100vh] justify-center gap-10 relative">
      <div className="flex flex-col items-center gap-5 absolute z-1 top-[70px]">
        <Geld width="94" heigth="36"></Geld>
        <Stepper currentStep={currentStep} numberOfSteps={numberOfSteps} />
      </div>
      {currentStep === 0 && (
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
            Your base currency should be the one you use most often. All
            transaction in other currencies will be calculated based on this one{" "}
          </p>
        </div>
      )}
      {currentStep === 1 && (
        <div className="w-[500px] flex flex-col items-center gap-6">
          <div className="flex flex-col gap-4 items-center mb-4">
            <IconStep2></IconStep2>
            <h3 className="font-bold text-lg">Set up your cash Balance</h3>
          </div>
          <input
            type="text"
            placeholder="Email"
            className="input input-bordered w-full max-w-xs"
          />
          <p className="text-gray-500 text-center">
            How much cash do you have in your wallet
          </p>
        </div>
      )}
      {currentStep === 2 && (
        <div className="w-[500px] flex flex-col items-center gap-6">
          <div className="flex flex-col gap-4 items-center mb-4">
            <IconStep3></IconStep3>
            <h3 className="font-bold text-lg">Good Job!</h3>
          </div>
          <input
            type="text"
            placeholder="Email"
            className="input input-bordered w-full max-w-xs"
          />
          <p className="text-gray-500 text-center">
            How much cash do you have in your wallet
          </p>
        </div>
      )}
      <div>
        {/* <button
          onClick={() => setCurrentStep(currentStep - 1)}
          disabled={currentStep === 0}
        >
          Previous step
        </button> */}
        <button
          onClick={() => setCurrentStep(currentStep + 1)}
          // disabled={currentStep === numberOfSteps - 1}
          className="btn btn-primary w-[500px]"
        >
          {nextStep}
        </button>
      </div>
    </div>
  );
};
