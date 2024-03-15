import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required *"),
  password: Yup.string()
    // .min(8, "Password must be at least 8 characters")
    .required("Password is required *"),
});

export const signUpSchema = Yup.object().shape({
  name: Yup.string().required("Name is required *"),
  email: Yup.string().email("Invalid email").required("Email is required *"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required *"),
  rePassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});
export const amountSchema = Yup.object().shape({
  amount: Yup.number()
  .typeError("Amount must be a number")
    .required("Amount is required *"),
});