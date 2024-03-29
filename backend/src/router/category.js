import { Router } from "express";
import { getAllCategories, postCategory, createTable, dropTable, getSelectCategoryId, getSelectCategory } from "../controller/category.js";


const category = Router();

category.route("/select-category").post(getSelectCategory);

category.route("/select-category-id").post(getSelectCategoryId);

category.route("/").post(getAllCategories)
category.route("/post-category").post(postCategory);
category.route("/table").post(createTable).delete(dropTable);
export { category };
