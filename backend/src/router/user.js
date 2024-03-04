import { Router } from "express";
import { getAllUsers } from "../controller/user";

const user = Router();

user.route("/").get(getAllUsers).post();
export {user};

