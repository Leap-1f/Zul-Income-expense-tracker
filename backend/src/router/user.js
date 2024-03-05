import { Router } from "express";
import { createTable, dropTable, getAllUsers, postUser } from "../controller/user.js";

const user = Router();

user.route("/").get(getAllUsers).post(postUser);
user.route("/table").post(createTable).delete(dropTable);
export { user };
