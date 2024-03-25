import { Router } from "express";
import {
  createTable,
  dropTable,
  getAllUsers,
  postUser,
  login,
  signin,
  getUserBalance,
  postUserBalance,
} from "../controller/user.js";

const user = Router();

user.route("/login").post(login);
user.route("/signin").post(signin);
user.route("/signup").get(getAllUsers).post(postUser);
user.route("/user/getbalance").post(getUserBalance);
user.route("/user/postbalance").post(postUserBalance);
user.route("/user/table").post(createTable).delete(dropTable);
export { user };


