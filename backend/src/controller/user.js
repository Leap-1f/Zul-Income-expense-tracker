import { sql } from "../../config/database.js";

export const getAllUsers = async (req, res) => {
  const tableName = "users";
  console.log("__________");
  try {
    const data = await sql`SELECT * FROM ${tableName}`;
    res.send(data);
  } catch (err) {
    console.log(err);
  }
};

export const postUser = async (req, res) => {
  try {
    const data = await sql`SELECT * FROM ${tableName}`;
    const newUser =
      await sql`INSERT INTO ${tableName}(email, name) VALUES(${req.body.email}, ${req.body.name}) RETURNING *`;
    data.push(newUser);
    console.log(data);
    res.send(data);
  } catch (err) {
    console.log(err);
  }
};
export const createTable = async (req, res) => {
  try {
    const data =
      await sql`CREATE TABLE ${tableName}(id UUID PRIMARY KEY DEFAULT gen_random_uuid(), email VARCHAR(50) UNIQUE NOT NULL, name VARCHAR(50) NOT NULL, password TEXT, avatar_img TEXT, createdAt TIMESTAMP, updatedAt TIMESTAMP, currency_type TEXT DEFAULT 'MNT')`;
    console.log(data);
    res.send(`${tableName} table is created`);
  } catch (err) {
    console.log(err);
  }
};

export const dropTable = async (req, res) => {
  try {
    const data = await sql`DROP TABLE ${tableName}`;
    console.log(data);
    res.send(`${tableName} table was deleted`);
  } catch (err) {
    console.log(err);
  }
};
