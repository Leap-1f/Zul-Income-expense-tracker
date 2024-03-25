import { Router } from "express";
import { createTable, deleteTransaction, dropTable, getAllTransaction, getTransactionTypeAndAmount, postTransaction } from "../controller/transaction.js";

const transaction = Router();

transaction.route("/post-transaction").post(postTransaction);
transaction.route("/get-amount").post(getTransactionTypeAndAmount);
transaction.route("/").post(getAllTransaction)
transaction.route("/delete").post(deleteTransaction);
transaction.route("/table").post(createTable).delete(dropTable);
export { transaction };