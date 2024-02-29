import { useState, useStepper } from "react";
import { Geld } from "./utils/IconGeld";
// import {Component} from "@angular/core";
// import {StepsetModule} from "stepper-library";
import { Stepper, Step } from "headless-stepper/components";
import React from "react";

export const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const steps = React.useMemo(
    () => [
      {
        label: "Step 1",
      },
      { label: "Step 2" },
      { label: "Step 3" },
      { label: "Step 4", disabled: true },
      { label: "Step 5" },
      { label: "Step 6" },
    ],
    []
  );
  const { state, nextStep, prevStep, progressProps, stepsProps } = useStepper({
    steps,
  });
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
    <div>
      {/* <Stepper currentStep={0}>
      <Step label="Step 1">Step 1 content</Step>

      <Step label="Step 2">Step 2 content</Step>

      <Step label="Step 3">Step 3 content</Step>
    </Stepper> */}
      <div className={styles["container"]}>
        <div>
          <nav style={{ display: "flex" }}>
            {stepsProps?.map((step, index) => (
              <ol key={index}>
                <a {...step}>{steps[index].label}</a>
              </ol>
            ))}
          </nav>
        </div>
        <p>Current step: {state.currentStep}</p>
        <button
          className="py-4 px-3 bg-blue-300"
          onClick={prevStep}
          disabled={!state.hasPreviousStep}
        >
          Prev
        </button>
        <button className="py-4 px-3 bg-blue-300" onClick={nextStep}>
          Next
        </button>
        <div className="bg-gray-400 w-100% h-1/2" {...progressProps} />
      </div>
    </div>
  );
};

// @Component({
//     selector: "app",
//     template: `
// <stepset [finishBtn]="buttonClass" btnPos="btn-right" containerPos="center" strokeColor="rgb(201, 82, 230)" (submitEvent)="submit()">
//   <step title="Personal Info">
//     <form #form1="ngForm">
//       <div class="form-group">
//         <label>Name</label>
//         <input placeholder="Name" name="form11" [(ngModel)]="dummyform.fname" required>
//       </div>
//       <div class="form-group">
//         <label>Email</label>
//         <input placeholder="Email" name="email" [(ngModel)]="dummyform.email" required>
//       </div>
//     </form>
//   </step>
// </stepset>
// `
// })
// export class App {

// }
