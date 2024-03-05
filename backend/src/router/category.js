import { Router } from "express";
import { getAllCategories, postCategory, createTable, dropTable } from "../controller/category";


const category = Router();

category.route("/").get(getAllCategories).post(postCategory);
category.route("/table").post(createTable).delete(dropTable);
export { category };
