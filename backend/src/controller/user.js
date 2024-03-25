import { sql } from "../../config/database.js";
import bcryct from "bcrypt";
import jwt from "jsonwebtoken";

export const getAllUsers = async (req, res) => {
  console.log("__________");

  try {
    const data = await sql`SELECT * FROM users`;
    res.send(data);
  } catch (err) {
    console.log(err);
  }
};
export const getUserBalance = async (req, res) => {
  try {
    const data = await sql`SELECT amount FROM users where id=${req.body.id}`;
    res.send(data);
  } catch (err) {
    console.log(err);
  }
};
export const postUserBalance = async (req, res) => {
  console.log(req.body, "---------------------------");
  try {
    const data =
      await sql`UPDATE users SET amount = ${req.body.balance} WHERE id = ${req.body.id}`;
    res.send(data);
  } catch (err) {
    console.log(err);
  }
};
export const postUser = async (req, res) => {
  try {
    const { name, password, email, currencyType, amount } = req.body;
    const salt = bcryct.genSaltSync(1);
    const hashedPassword = await bcryct.hash(password, salt);
    const data = await sql`SELECT * FROM users`;
    const newUser =
      await sql`INSERT INTO users(email, name, password, currency_type, amount) VALUES(${email}, ${name}, ${hashedPassword}, ${currencyType}, ${amount}) RETURNING *`;
    data.push(newUser);
    res.send({ success: true, statusCode: 201 });
  } catch (err) {
    console.log(err, "hellooo");
  }
};

export const createTable = async (req, res) => {
  try {
    const data =
      await sql`CREATE TABLE users(id uuid PRIMARY KEY DEFAULT uuid_generate_v4(), 
      email VARCHAR(50) UNIQUE NOT NULL, 
      name VARCHAR(50) NOT NULL, 
      password VARCHAR(255) NOT NULL, 
      avatar_img TEXT, 
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
      currency_type TEXT DEFAULT 'MNT',
      amount INT NOT NULL)`;
    console.log(data);
    res.send(`users table is created`);
  } catch (err) {
    console.log(err);
  }
};

export const dropTable = async (req, res) => {
  try {
    const data = await sql`DROP TABLE users`;
    console.log(data);
    res.send(`users table was deleted`);
  } catch (err) {
    console.log(err);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await sql`SELECT * FROM users where email=${email}`;
    console.log(data, "data");
    if (data.length === 0) {
      res.send({
        message: "nodata",
        data: null,
      });
      return;
    }
    const isValid = await bcryct.compare(password, data[0].password);
    if (isValid) {
      // const userInfo = {
      //   id: data[0].id,
      //   name: data[0].name,
      // };

      // const token = jwt.sign(data[0], process.env.JWT_SECRET, {
      //   expiresIn: "1d",
      // });
      res.send({
        success: true,
        statusCode: 200,
        // token: token,
        user: data[0],
      });
    } else {
      res.send({
        message: "failed",
        data: null,
      });
    }
  } catch (err) {
    console.log(err);
  }
};
export const signin = async (req, res) => {
  try {
    const { email } = req.body;
    const data = await sql`SELECT * FROM users where email=${email}`;
    console.log(data);
    if (data.length === 1) {
      res.send({
        message: "This email is registered.",
      });
    } else if (data.length === 0) {
      res.send({ success: true, statusCode: 200 });
    }
  } catch (err) {
    console.log(err);
  }
};
