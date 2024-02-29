import { useState } from "react";
import { Geld } from "./utils/IconGeld";

export const LogIn = () => {
  const [signUp, setSignUp] = useState(false);
  const handleSignUp = () => {
    setSignUp(true);
  };
  const handleLogIn = () => {
    setSignUp(false);
  };
  return (
    <div className="flex *:w-1/2 *:h-[100vh]">
      <div className="bg-white flex justify-center items-center">
       {!signUp &&
        <div className="flex flex-col items-center gap-7">
          <Geld width="94" heigth="36"></Geld>
          <div className="*:text-center">
            <h3 className="mb-3 font-bold">Welcome Back</h3>
            <p>Welcome back, Please enter your details</p>
          </div>
          <form className="flex flex-col gap-2 w-full" action="">
            <input
              type="text"
              placeholder="Email"
              className="input input-bordered w-full max-w-xs"
            />
            <input
              type="text"
              placeholder="Password"
              className="input input-bordered w-full max-w-xs"
            />
            <button class="btn btn-primary">Log in</button>
          </form>
          <div>
            <p>
              Dont have account?{" "}
              <span onClick={handleSignUp} className="text-blue-700 cursor-pointer">
                Sign up{" "}
              </span>
            </p>
          </div>
        </div>}
        {signUp && (
          <div className="flex flex-col items-center gap-7">
            <Geld width="94" heigth="36"></Geld>
            <div className="*:text-center">
              <h3 className="mb-3 font-bold">Create Geld account</h3>
              <p>Sign up below to create your Wallet account</p>
            </div>
            <form className="flex flex-col gap-2 w-full" action="">
              <input
                type="text"
                placeholder="Name"
                className="input input-bordered w-full max-w-xs"
              />
              <input
                type="text"
                placeholder="Email"
                className="input input-bordered w-full max-w-xs"
              />
              <input
                type="text"
                placeholder="Password"
                className="input input-bordered w-full max-w-xs"
              />
              <input
                type="text"
                placeholder="Re-password"
                className="input input-bordered w-full max-w-xs"
              />
              <button class="btn btn-primary">Log in</button>
            </form>
            <div>
              <p>
                Already have account?{" "}
                <span onClick={handleLogIn} className="text-blue-700 cursor-pointer">
                  Log in{" "}
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="bg-blue-700"></div>
    </div>
  );
};
