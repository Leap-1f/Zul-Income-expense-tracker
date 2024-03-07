import { sql } from "../../config/database.js";
const tableName = "users";
export const getAllUsers = async (req, res) => {
  console.log("__________");

  try {
    const data = await sql`SELECT * FROM ${sql(tableName)}`;
    res.send(data);
  } catch (err) {
    console.log(err);
  }
};

export const postUser = async (req, res) => {
  try {
    const data = await sql`SELECT * FROM ${sql(tableName)}`;
    const newUser = await sql`INSERT INTO ${sql(
      tableName
    )}(email, name, password) VALUES(${req.body.email}, ${req.body.name}, ${
      req.body.password
    }) RETURNING *`;
    data.push(newUser);
    console.log(data);
    res.send(data);
  } catch (err) {
    console.log(err);
  }
};
export const createTable = async (req, res) => {
  try {
    const data = await sql`CREATE TABLE ${sql(
      tableName
    )}(id uuid PRIMARY KEY DEFAULT uuid_generate_v4(), 
      email VARCHAR(50) UNIQUE NOT NULL, 
      name VARCHAR(50) NOT NULL, 
      password TEXT NOT NULL, 
      avatar_img TEXT, 
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
      currency_type TEXT DEFAULT 'MNT',
      amount INT NOT NULL)`;
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

export const login = async (req, res) => {
  try {
    const data = await sql`SELECT * FROM ${sql(tableName)} where email=${
      req.body.email
    }`;

    if (data.length === 0) {
      res.send("burtgelgui mail hayg baina");
      return;
    }

    if (data[0].password === req.body.password) {
      res.send("amjilttai newterlee");
    } else {
      res.send("password buruu baina");
    }
  } catch (err) {
    console.log(err);
  }
};
