import { useEffect, useState } from "react";
import { Geld } from "./utils/IconGeld";
import { useRouter } from "next/router";
import { loginSchema, signUpSchema } from "./validationSchema";
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
        const res = await fetch(API_URL, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(values),
        });
        const data = await res.json();
        console.log(data);
        push("/sign-up");
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
    onSubmit: (values) => {
      console.log(values);
      // event.preventDefault();
      users.forEach((el) => {
        if (
          el.email === values.email &&
          el.password === values.password
        ) {
          setmatched(true);
          push("/dashboard");
          console.log("correct");
        } else {
          setmatched(false);
        }
      });
    }
  })
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
            <FormikProvider value={formikLogIn}>
            <form
              className="flex flex-col gap-2 w-full"
              action=""
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
                  <div className="text-red-500 text-xs" id="">{formikLogIn.errors.email}</div>
                ) : null}
              <input
                onChange={formikLogIn.handleChange}
                type="text"
                placeholder="Password"
                className="input input-bordered w-full max-w-xs"
                name="password"
                value={formikLogIn.values.password}
              />
              {formikLogIn.errors.password && formikLogIn.touched.password ? (
                  <div className="text-red-500 text-xs" id="">{formikLogIn.errors.password}</div>
                ) : null}
              <button type="submit" class="btn btn-primary w-full">
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
                  <div className="text-red-500 text-xs" id="">{formikSignUp.errors.name}</div>
                ) : null}
                <input
                  onChange={formikSignUp.handleChange}
                  type="text"
                  placeholder="Email"
                  className="input input-bordered w-full max-w-xs"
                  name="email"
                />
                {formikSignUp.errors.email && formikSignUp.touched.email ? (
                  <div className="text-red-500 text-xs" id="">{formikSignUp.errors.email}</div>
                ) : null}
                <input
                  onChange={formikSignUp.handleChange}
                  type="text"
                  placeholder="Password"
                  className="input input-bordered w-full max-w-xs"
                  name="password"
                />
                {formikSignUp.errors.password && formikSignUp.touched.password ? (
                  <div className="text-red-500 text-xs" id="">{formikSignUp.errors.password}</div>
                ) : null}
                <input
                  onChange={formikSignUp.handleChange}
                  type="text"
                  placeholder="Re-password"
                  className="input input-bordered w-full max-w-xs"
                  name="rePassword"
                />
                {formikSignUp.errors.rePassword && formikSignUp.touched.rePassword ? (
                  <div className="text-red-500 text-xs" id="">{formikSignUp.errors.rePassword}</div>
                ) : null}
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
