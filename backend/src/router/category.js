import { Router } from "express";
import { getAllCategories, postCategory, createTable, dropTable, getSelectCategory } from "../controller/category.js";


const category = Router();

category.route("/").get(getAllCategories).post(postCategory);
category.route("/category").post(getSelectCategory);
category.route("/table").post(createTable).delete(dropTable);
export { category };
