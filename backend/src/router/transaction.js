import { Router } from "express";
import { createTable, dropTable, getAllTransaction, postTransaction } from "../controller/transaction.js";

const transaction = Router();

transaction.route("/").get(getAllTransaction).post(postTransaction);
transaction.route("/table").post(createTable).delete(dropTable);
export { transaction };