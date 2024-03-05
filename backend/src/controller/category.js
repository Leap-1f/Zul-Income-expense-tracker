import { sql } from "../../config/database.js";
let tableName = "category";


export const getAllCategories = async (req, res) => {
  try {
    const data = await sql`SELECT * FROM ${tableName}`;
    console.log(data);
    res.send(data);
  } catch (err) {
    console.log(err);
  }
};

export const postCategory = async (req, res) => {
  try{const data = await sql`SELECT * FROM ${tableName}`;
  const newCategory =
    await sql`INSERT INTO ${tableName}(name, email) VALUES(${req.body.name}, ${req.body.email}) RETURNING *`;
  data.push(newCategory);
  console.log(data);
  res.send(data);
} catch(err){
    console.log(err);
  }
  
};
export const createTable = async(req, res) => {
  try{const data = await sql`CREATE TABLE category(id SERIAL PRIMARY KEY, name TEXT, description TEXT, createdAt TIMESTAMP, updatedAt TIMESTAMP, category_image text);`;
    console.log(data);
    res.send(`${tableName} table is created`);
} catch(err) {
  console.log(err);
}
}

export const dropTable = async(req, res) => {
  try{
    const data = await sql`DROP TABLE ${tableName}`;
  console.log(data);
  res.send(`${tableName} table was deleted`);
  } catch (err){
    console.log(err);
  }
}
