import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Geld } from "./utils/IconGeld";
import Link from "next/link";

import React from "react";
import Stepper from "../components/Stepper";
import { StepOne, StepTwo, StepThree } from "../components/login/index";

export const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [currentStep, setCurrentStep] = useState(0);
  const numberOfSteps = 3;
  const {push} = useRouter();

  const startLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };
  const confirm = () => {
    setCurrentStep(currentStep + 1);
    if (currentStep === 2) {
      startLoading();
      push("/");
    }
  };
  useEffect(() => {
    if (currentStep === 0) {
      startLoading();
    }
  }, [currentStep]);

  console.log(currentStep, "currentstep");
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
      {currentStep === 0 && <StepOne />}
      {currentStep === 1 && <StepTwo />}
      {currentStep === 2 && <StepThree />}
      <div>
        {/* <button
          onClick={() => setCurrentStep(currentStep - 1)}
          disabled={currentStep === 0}
        >
          Previous step
        </button> */}
        <button
          onClick={confirm}
          // disabled={currentStep === numberOfSteps - 1}
          className="btn btn-primary w-[500px]"
        >
          Confirm
        </button>
        {/* {currentStep === 2 ? (
          <Link href="/" condition={currentStep}>
            <button
              onClick={startLoading}
              // disabled={currentStep === numberOfSteps - 1}
              className="btn btn-primary w-[500px]"
            >
              Confirm
            </button>
          </Link>
        ) : (
          <button
            onClick={() => setCurrentStep(currentStep + 1)}
            // disabled={currentStep === numberOfSteps - 1}
            className="btn btn-primary w-[500px]"
          >
            Confirm
          </button>
        )} */}
      </div>
    </div>
  );
};
