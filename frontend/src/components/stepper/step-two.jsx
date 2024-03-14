import { IconStep2 } from "../utils/index";
import { useContext } from "react";
import { Context } from "../utils/context";
import { FormikProvider } from "formik";

export const StepTwo = ({ formikAmount }) => {
  const { signUpUserInfo } = useContext(Context);

  console.log(signUpUserInfo);

  return (
    <div className="w-[400px] min-h-[240px] flex flex-col items-center gap-6">
      <div className="flex flex-col gap-4 items-center mb-4">
        <IconStep2></IconStep2>
        <h3 className="font-bold text-lg">Set up your cash Balance</h3>
      </div>

      <FormikProvider value={formikAmount}>
        <form
          className="flex flex-col gap-2 w-full"
          action=""
          onSubmit={formikAmount.handleSubmit}
        >
          <input
            onChange={formikAmount.handleChange}
            type="text"
            placeholder="Amount"
            className="input input-bordered w-full"
            name="amount"
            value={formikAmount.values.amount}
          />

          {formikAmount.errors.amount && formikAmount.touched.amount ? (
            <div className="text-red-500 text-xs" id="">
              {formikAmount.errors.amount}
            </div>
          ) : null}
        </form>
      </FormikProvider>
      <p className="text-gray-500 text-left text-xs w-full">
        How much cash do you have in your wallet?
      </p>
    </div>
  );
};
