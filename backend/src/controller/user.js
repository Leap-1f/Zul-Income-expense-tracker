import { sql } from "../../config/database.js";
let tableName = "users";


export const getAllUsers = async (req, res) => {
  try {
    const data = await sql`SELECT * FROM ${tableName}`;
    console.log(data);
    res.send(data);
  } catch (err) {
    console.log(err);
  }
};

export const postUser = async (req, res) => {
  try{const data = await sql`SELECT * FROM ${tableName}`;
  const newUser =
    await sql`INSERT INTO ${tableName}(name, email) VALUES(${req.body.name}, ${req.body.email}) RETURNING *`;
  data.push(newUser);
  console.log(data);
  res.send(data);
} catch(err){
    console.log(err);
  }
  
};
export const createTable = async(req, res) => {
  try{const data = await sql`CREATE TABLE ${tableName}(id SERIAL PRIMARY KEY, email TEXT UNIQUE NOT NULL, name TEXT NOT NULL, password TEXT, avatar_img TEXT, createdAt TIMESTAMP, updatedAt TIMESTAMP, currency_type TEXT DEFAULT 'MNT')`;
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
