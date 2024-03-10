import { IconStep1 } from "../utils/index";
import { useContext } from "react";
import { Context } from "../utils/context";

export const StepOne = () => {
  const { signUpUserInfo, setSignUpUserInfo } = useContext(Context);
  const handleChange = (event) => {
    const { value } = event.target;

    setSignUpUserInfo({
      ...signUpUserInfo,
      currencyType: value,
    });
  };
  console.log(signUpUserInfo);
  return (
    <div className="w-[400px] min-h-[240px] flex flex-col items-center gap-6">
      <div className="flex flex-col gap-4 items-center mb-4">
        <IconStep1></IconStep1>
        <h3 className="font-bold text-lg">Select base currency</h3>
      </div>
      <select
        onChange={handleChange}
        value={signUpUserInfo.currencyType}
        className="select select-bordered w-full"
      >
        <option value="MNT">MNT-Mongolian Tugrik</option>
        <option value="USD">USD-United States dollar</option>
      </select>
      <p className="text-gray-500 text-left text-xs">
        Your base currency should be the one you use most often. All transaction
        in other currencies will be calculated based on this one{" "}
      </p>
    </div>
  );
};
