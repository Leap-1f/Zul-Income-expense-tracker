import { sql } from "../../config/database.js";
const tableName = "transaction";
export const getAllTransaction = async (req, res) => {
  console.log("__________");

  try {
    const data = await sql`SELECT * FROM ${sql(tableName)}`;
    res.send(data);
  } catch (err) {
    console.log(err);
  }
};

export const postTransaction = async (req, res) => {
  try {
    const data = await sql`SELECT * FROM ${sql(tableName)}`;
    const newUser =
      await sql`INSERT INTO ${sql(tableName)}(email, name) VALUES(${req.body.email}, ${req.body.name}) RETURNING *`;
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
      await sql`CREATE TABLE ${sql(tableName)}(id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), 
      user_id uuid REFERENCES users(id), 
      name TEXT, 
      amount REAL NOT NULL, 
      transaction_type VARCHAR(3) CHECK (transaction_type IN ('INC', 'EXP')), 
      description TEXT, 
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
      category_id uuid REFERENCES category(id))`;
    console.log(data);
    res.send(`${tableName} table is created`);
  } catch (err) {
    console.log(err);
  }
};

export const dropTable = async (req, res) => {
  try {
    const data = await sql`DROP TABLE ${sql(tableName)}`;
    console.log(data);
    res.send(`${tableName} table was deleted`);
  } catch (err) {
    console.log(err);
  }
};
