import { sql } from "../../config/database.js";
let tableName = "category";


export const getAllCategories = async (req, res) => {
  try {
    const data = await sql`SELECT * FROM ${sql(tableName)}`;
    console.log(data);
    res.send(data);
  } catch (err) {
    console.log(err);
  }
};
export const getSelectCategory = async (req, res) => {
  try {
    const data = await sql`SELECT * FROM category WHERE id=${req.body.id}`;
    console.log(data);
    res.send(data);
  } catch (err) {
    console.log(err);
  }
};

export const postCategory = async (req, res) => {
  try{const data = await sql`SELECT * FROM category`;
  const newCategory =
    await sql`INSERT INTO category(name, description, category_image) VALUES(${req.body.categoryName}, ${req.body.color}, ${req.body.categoryImg}) RETURNING *`;
  data.push(newCategory);
  console.log(data);
  res.send(data);
} catch(err){
    console.log(err);
  }
  
};
export const createTable = async(req, res) => {
  try{const data = await sql`CREATE TABLE ${sql(tableName)}(id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), 
  name VARCHAR(100), 
  description TEXT, 
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
  category_image text);`;
    console.log(data);
    res.send(`${tableName} table is created`);
} catch(err) {
  console.log(err);
}
}

export const dropTable = async(req, res) => {
  try{
    const data = await sql`DROP TABLE ${sql(tableName)}`;
  console.log(data);
  res.send(`${tableName} table was deleted`);
  } catch (err){
    console.log(err);
  }
}
