import { useEffect, useState } from "react";
import { Geld } from "./utils/IconGeld";
import Link from "next/link";
import { useRouter } from "next/router";

export const LogIn = () => {
  const [signUp, setSignUp] = useState(false);
  const [users, setUsers] = useState([]);
  const [matched, setmatched] = useState(false);
  const [logInUserInfo, setLogInUserInfo] = useState({
    email: "",
    password: "",
  });

  const { push } = useRouter();
  const API_URL = "http://localhost:9090/users";
  const handleSignUp = () => {
    setSignUp(true);
  };
  const handleLogIn = () => {
    setSignUp(false);
  };
  const handleChangeInput = (event) => {
    const { value, name } = event.target;
    if (name == "email") {
      setLogInUserInfo({
        ...logInUserInfo,
        email: value,
      });
    } else {
      setLogInUserInfo({
        ...logInUserInfo,
        password: value,
      });
    }
  };
  // console.log(logInUserInfo, "input userinfo");
  const getUsers = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);
  // console.log(users);

  const logInToDashboard = (event) => {
    event.preventDefault();
    users.forEach((el) => {
      if (
        el.email === logInUserInfo.email &&
        el.password === logInUserInfo.password
      ) {
        setmatched(true);
        push("/dashboard");
        console.log("correct");
      } else {
        setmatched(false);
      }
    });
  };
  console.log(matched);
  return (
    <div className="flex *:w-1/2 *:h-[100vh]">
      <div className="bg-white flex justify-center items-center">
        {!signUp && (
          <div className="flex flex-col items-center gap-7">
            <Geld width="94" heigth="36"></Geld>
            <div className="*:text-center">
              <h3 className="mb-3 font-bold">Welcome Back</h3>
              <p>Welcome back, Please enter your details</p>
            </div>
            <form
              className="flex flex-col gap-2 w-full"
              action=""
              onSubmit={logInToDashboard}
            >
              <input
                onChange={handleChangeInput}
                type="text"
                placeholder="Email"
                className="input input-bordered w-full max-w-xs"
                name="email"
              />
              <input
                onChange={handleChangeInput}
                type="text"
                placeholder="Password"
                className="input input-bordered w-full max-w-xs"
                name="password"
              />
              <button type="submit" class="btn btn-primary w-full">
                Log in
              </button>
            </form>
            <div>
              <p>
                Dont have account?{" "}
                <span
                  onClick={handleSignUp}
                  className="text-blue-700 cursor-pointer"
                >
                  Sign up{" "}
                </span>
              </p>
            </div>
          </div>
        )}
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
              <Link href="/sign-up">
                {" "}
                <button class="btn btn-primary w-full">Log in</button>
              </Link>
            </form>
            <div>
              <p>
                Already have account?{" "}
                <span
                  onClick={handleLogIn}
                  className="text-blue-700 cursor-pointer"
                >
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
