import { IconStep2 } from "../utils/index";
import { useContext } from "react";
import { Context } from "../utils/context";

export const StepTwo = () => {
  const { signUpUserInfo, setSignUpUserInfo } = useContext(Context);
  const handleChange = (event) => {
    const { value } = event.target;

    setSignUpUserInfo({
      ...signUpUserInfo,
      amount: value,
    });
  };
  console.log(signUpUserInfo);
  return (
    <div className="w-[400px] min-h-[240px] flex flex-col items-center gap-6">
      <div className="flex flex-col gap-4 items-center mb-4">
        <IconStep2></IconStep2>
        <h3 className="font-bold text-lg">Set up your cash Balance</h3>
      </div>
      <input
        type="text"
        placeholder="Amount"
        className="input input-bordered w-full "
        onChange={handleChange}
        value={signUpUserInfo.amount}
      />
      <p className="text-gray-500 text-left text-xs w-full">
        How much cash do you have in your wallet?
      </p>
    </div>
  );
};
