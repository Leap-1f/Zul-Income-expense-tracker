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
  const [signUpUserInfo, setSignUpUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    rePassword: "",
  });

  const { push } = useRouter();
  const API_URL = "http://localhost:9090/users";
  const handleSignUp = () => {
    setSignUp(true);
  };
  const handleLogIn = () => {
    setSignUp(false);
  };
  const handleChangeLogInInput = (event) => {
    const { value, name } = event.target;
    if (name == "email") {
      setLogInUserInfo({
        ...logInUserInfo,
        email: value,
      });
    } else if (name == "password") {
      setLogInUserInfo({
        ...logInUserInfo,
        password: value,
      });
    }
  }
  const handleChangeSignUpInput = (event) => {
    const { value, name } = event.target;
    if (name == "email") {
      setSignUpUserInfo({
        ...signUpUserInfo,
        email: value,
      });
    } else if (name == "password") {
      setSignUpUserInfo({
        ...signUpUserInfo,
        password: value,
      });
    }
    else if (name == "re-password") {
      setSignUpUserInfo({
        ...signUpUserInfo,
        rePassword: value,
      });
    }
    else if (name == "name") {
      setSignUpUserInfo({
        ...signUpUserInfo,
        name: value,
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
  console.log(users, "users");
  console.log(logInUserInfo, "loginuserinfo");

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
  const signUpLogIn = async (event) => {
    event.preventDefault();
    try {
      await signUpSchema.validate(signUpUserInfo, { abortEarly: false });
      // If validation passes, proceed with the sign-up logic
      // For example, create a new user in the database
      // If successful, redirect to the sign-up page or dashboard
      push("/sign-up");
   } catch (error) {
      console.log(error.errors); // Handle validation errors
   }
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
                onChange={handleChangeLogInInput}
                type="text"
                placeholder="Email"
                className="input input-bordered w-full max-w-xs"
                name="email"
              />
              <input
                onChange={handleChangeLogInInput}
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
            <form className="flex flex-col gap-2 w-full" action="" onSubmit={signUpLogIn}>
              <input
              onChange={handleChangeSignUpInput}
                type="text"
                placeholder="Name"
                className="input input-bordered w-full max-w-xs"
                name="name"
              />
              <input
              onChange={handleChangeSignUpInput}
                type="text"
                placeholder="Email"
                className="input input-bordered w-full max-w-xs"
                name="email"
              />
              <input
              onChange={handleChangeSignUpInput}
                type="text"
                placeholder="Password"
                className="input input-bordered w-full max-w-xs"
                name="password"
              />
              <input
              onChange={handleChangeSignUpInput}
                type="text"
                placeholder="Re-password"
                className="input input-bordered w-full max-w-xs"
                name="rePassword"
              />
              {/* <Link href="/sign-up">
                {" "} */}
                <button type="submit" class="btn btn-primary w-full">Log in</button>
              {/* </Link> */}
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
