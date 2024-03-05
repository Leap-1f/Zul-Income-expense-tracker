import { Router } from "express";
import { getAllUsers } from "../controller/user.js";

const transaction = Router();

transaction.route("/").get(getAllUsers).post();
export { transaction };
