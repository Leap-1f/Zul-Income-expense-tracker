import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { Geld } from "../utils/IconGeld";

import React from "react";
import { StepOne, StepTwo, StepThree, Stepper } from "../stepper/index";
import { Context } from "../utils/context";
import { PreviousButton } from "../utils";
import { useFormik } from "formik";
import { amount } from "../login/validationSchema";

export const SignUp = () => {
  const { startLoading, signUpUserInfo, isLoading, setSignUpUserInfo } =
    useContext(Context);
  const [currentStep, setCurrentStep] = useState(0);

  const numberOfSteps = 3;
  const confirmButton = () => {
    return currentStep === 2 ? "Return to login" : "Confirm";
  };
  console.log(process.env.NEXT_PUBLIC_ENDPOINT);

  const { push } = useRouter();
  const formikAmount = useFormik({
    initialValues: {
      amount: "",
    },
    validationSchema: amount,
    onReset: (e) => {
      const formatter = new Intl.NumberFormat("en-US");
      console.log(e.target.value);
      formatter.format(e.target.value);
    },
    onSubmit: async (value) => {
      setSignUpUserInfo({
        ...signUpUserInfo,
        amount: value.amount,
      });
      console.log("step2 submit ajillaa");
      setCurrentStep(currentStep + 1);
    },
  });
  const confirm = async () => {
    if (currentStep === 0) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 1) {
      formikAmount.handleSubmit();
    } else if (currentStep === 2) {
      console.log("-----------------");
      console.log(signUpUserInfo);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_ENDPOINT}/api/signup`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(signUpUserInfo),
          }
        );
        const data = await res.json();
        console.log(data);
      } catch (err) {
        console.log(err);
      }
      console.log("hi");
      startLoading();
      push("/");
    }
  };
  const previous = () => {
    setCurrentStep(currentStep - 1);
  };
  useEffect(() => {
    if (currentStep === 0 || currentStep === 3) {
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
            <div className="loading loading-spinner loading-md"></div>
            <p>Түр хүлээнэ үү...</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center h-[100vh] justify-center gap-10 relative">
      <div className="flex flex-col items-center gap-5 absolute z-1 top-[30px]">
        <Geld width="94" heigth="36"></Geld>
        <Stepper currentStep={currentStep} numberOfSteps={numberOfSteps} />
      </div>
      <div className="relative w-[400px] ">
        <div className="absolute -left-10 top-[130px] z-1 ">
          <button
            onClick={previous}
            disabled={currentStep === 0}
            className="flex justify-center items-center rounded-full hover:scale-150 active:scale-125 w-5 h-5"
          >
            <PreviousButton currentStep={currentStep} />
          </button>
        </div>

        <div className="flex flex-col items-center justify-center">
          <div>
            {currentStep === 0 && <StepOne />}
            {currentStep === 1 && <StepTwo formikAmount={formikAmount} />}
            {currentStep === 2 && <StepThree />}
          </div>
          <button
            type="submit"
            onClick={confirm}
            // disabled={currentStep === numberOfSteps - 1}
            className="btn btn-primary w-full mt-[50px]"
          >
            {confirmButton()}
          </button>
        </div>
      </div>
    </div>
  );
};
