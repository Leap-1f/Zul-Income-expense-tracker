import { Router } from "express";
import {
  createTable,
  dropTable,
  getAllUsers,
  postUser,
  login,
} from "../controller/user.js";

const user = Router();

user.route("/login").post(login);
user.route("/signup").get(getAllUsers).post(postUser);
user.route("/user/table").post(createTable).delete(dropTable);
export { user };
