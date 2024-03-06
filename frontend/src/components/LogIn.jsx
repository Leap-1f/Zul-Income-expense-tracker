import { useEffect, useState } from "react";
import { Geld } from "./utils/IconGeld";
import { useRouter } from "next/router";
import { signUpSchema } from "./validationSchema";
import {
  Formik,
  Field,
  useField,
  ErrorMessage,
  useFormik,
  FormikProvider,
} from "formik";

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
  const API_URL = "http://localhost:9090/api/signup";

  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
      email: "",
      rePassword: "",
    },
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
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
  };
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
    } else if (name == "re-password") {
      setSignUpUserInfo({
        ...signUpUserInfo,
        rePassword: value,
      });
    } else if (name == "name") {
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
  const signUpButton = async (event) => {
    event.preventDefault();
    // try {
    //   await signUpSchema.validate(signUpUserInfo, {
    //     abortEarly: false,
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
    try {
      const res = await fetch(API_URL, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(signUpUserInfo),
      });
      const data = await res.json();
      console.log(data);
      push("/sign-up");
    } catch (err) {
      console.log(err);
    }
  };
  console.log(matched);
  const MySpecialField = () => {
    const [field, meta] = useField("firstName");
    return (
      <div>
        <input {...field} className="border-2" />
        {meta.touched && meta.error && <div>{meta.error}</div>}
      </div>
    );
  };
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
            <FormikProvider value={formik}>
              <form
                onSubmit={formik.handleSubmit}
                className="flex flex-col gap-2 w-full"
                action=""
              >
                <input
                  id="name"
                  type="text"
                  placeholder="Name"
                  onChange={formik.handleChange}
                  className="input input-bordered w-full max-w-xs"
                  name="name"
                  value={formik.values.name}
                />
                {formik.errors.name && formik.touched.name ? (
                  <div id="hello">{formik.errors.name}</div>
                ) : null}
                <Field
                  onChange={handleChangeSignUpInput}
                  type="text"
                  placeholder="Email"
                  className="input input-bordered w-full max-w-xs"
                  name="email"
                />
                {/* {props.errors.email && touched.email && (
                <div id="feedback">{props.errors.email}</div>
              )} */}
                <Field
                  onChange={handleChangeSignUpInput}
                  type="text"
                  placeholder="Password"
                  className="input input-bordered w-full max-w-xs"
                  name="password"
                />
                <Field
                  onChange={handleChangeSignUpInput}
                  type="text"
                  placeholder="Re-password"
                  className="input input-bordered w-full max-w-xs"
                  name="rePassword"
                />
                {/* <ErrorMessage name="name" component="div" />
                <ErrorMessage name="email" component="div" />
                <ErrorMessage name="password" component="div" />
                <ErrorMessage name="rePassword" component="div" /> */}
                {/* <MySpecialField/> */}
                <button type="submit" class="btn btn-primary w-full">
                  Sign in
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
