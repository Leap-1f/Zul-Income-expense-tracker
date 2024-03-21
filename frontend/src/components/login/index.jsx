import { useContext, useEffect, useState } from "react";
import { Geld } from "../utils/IconGeld";
import { useRouter } from "next/router";
import { loginSchema, signUpSchema } from "./validationSchema.js";
import { useFormik, FormikProvider } from "formik";
import { Context } from "../utils/context";

export const LogIn = () => {
  const { push } = useRouter();
  const [signUp, setSignUp] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const { signUpUserInfo, setSignUpUserInfo } = useContext(Context);

  const formikSignUp = useFormik({
    initialValues: {
      name: "",
      password: "",
      email: "",
      rePassword: "",
    },
    validationSchema: signUpSchema,
    onSubmit: async (values) => {
      console.log(values);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_ENDPOINT}/api/signin`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(values),
          }
        );
        const response = await res.json();
        console.log(response);

        if (response.message) {
          setWarningMessage(response.message);
        } else if (response.success) {
          setSignUpUserInfo({
            ...signUpUserInfo,
            name: values.name,
            email: values.email,
            password: values.password,
          });
          console.log(signUpUserInfo);
          push("/sign-up");
        }
      } catch (err) {
        console.log(err);
      }
    },
  });
  const formikLogIn = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_ENDPOINT}/api/login`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(values),
          }
        );
        const response = await res.json();
        console.log(response);
        if (response.success) {
          localStorage.setItem("token", response.token);
          push("/dashboard");
        } else if (response.message === "failed") {
          setWarningMessage("Password does not match.");
        } else if (response.message === "nodata") {
          setWarningMessage("Unregistered email.");
        }
      } catch (err) {
        console.log(err);
      }
    },
  });
  const handleSignUp = () => {
    setSignUp(true);
    setWarningMessage("");
  };
  const handleLogIn = () => {
    setSignUp(false);
    setWarningMessage("");
  };
  useEffect(() => {}, [warningMessage]);

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
            <FormikProvider value={formikLogIn}>
              <form
                className="flex flex-col gap-2 w-full"
                onSubmit={formikLogIn.handleSubmit}
              >
                <input
                  onChange={formikLogIn.handleChange}
                  type="text"
                  placeholder="Email"
                  className="input input-bordered w-full max-w-xs"
                  name="email"
                  value={formikLogIn.values.email}
                />
                {formikLogIn.errors.email && formikLogIn.touched.email ? (
                  <div className="text-red-500 text-xs" id="">
                    {formikLogIn.errors.email}
                  </div>
                ) : null}
                <input
                  onChange={formikLogIn.handleChange}
                  type="password"
                  placeholder="Password"
                  className="input input-bordered w-full max-w-xs"
                  name="password"
                  value={formikLogIn.values.password}
                />
                {formikLogIn.errors.password && formikLogIn.touched.password ? (
                  <div className="text-red-500 text-xs" id="">
                    {formikLogIn.errors.password}
                  </div>
                ) : null}
                {warningMessage && (
                  <p className="text-red-500 text-xs">{warningMessage}</p>
                )}
                <button type="submit" className="btn btn-primary w-full">
                  Log in
                </button>
              </form>
            </FormikProvider>
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
            <FormikProvider value={formikSignUp}>
              <form
                onSubmit={formikSignUp.handleSubmit}
                className="flex flex-col gap-2 w-full"
                action=""
              >
                <input
                  id=""
                  type="text"
                  placeholder="Name"
                  onChange={formikSignUp.handleChange}
                  className="input input-bordered w-full max-w-xs"
                  name="name"
                  value={formikSignUp.values.name}
                />
                {formikSignUp.errors.name && formikSignUp.touched.name ? (
                  <div className="text-red-500 text-xs" id="">
                    {formikSignUp.errors.name}
                  </div>
                ) : null}
                <input
                  onChange={formikSignUp.handleChange}
                  type="text"
                  placeholder="Email"
                  className="input input-bordered w-full max-w-xs"
                  name="email"
                />
                {formikSignUp.errors.email && formikSignUp.touched.email ? (
                  <div className="text-red-500 text-xs" id="">
                    {formikSignUp.errors.email}
                  </div>
                ) : null}
                <input
                  onChange={formikSignUp.handleChange}
                  type="password"
                  placeholder="Password"
                  className="input input-bordered w-full max-w-xs"
                  name="password"
                />
                {formikSignUp.errors.password &&
                formikSignUp.touched.password ? (
                  <div className="text-red-500 text-xs" id="">
                    {formikSignUp.errors.password}
                  </div>
                ) : null}
                <input
                  onChange={formikSignUp.handleChange}
                  type="password"
                  placeholder="Re-password"
                  className="input input-bordered w-full max-w-xs"
                  name="rePassword"
                />
                {formikSignUp.errors.rePassword &&
                formikSignUp.touched.rePassword ? (
                  <div className="text-red-500 text-xs" id="">
                    {formikSignUp.errors.rePassword}
                  </div>
                ) : null}
                {warningMessage && (
                  <p className="text-red-500 text-xs">{warningMessage}</p>
                )}
                <button type="submit" className="btn btn-primary w-full">
                  Sign up
                </button>
              </form>
            </FormikProvider>
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
