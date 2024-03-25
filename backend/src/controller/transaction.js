import { sql } from "../../config/database.js";
const tableName = "transaction";
export const getAllTransaction = async (req, res) => {
  console.log("__________");

  try {
    const data = await sql`SELECT 
        tar.*, 
        cat.description as category_color, 
        cat.name category_name, 
        cat.category_image 
      FROM transaction tar 
        inner join category cat on tar.category_id = cat.id
        WHERE tar.user_id = ${req.body.id};`;
    res.send(data);
  } catch (err) {
    console.log(err);
  }
};
export const getTransactionTypeAndAmount = async (req, res) => {
  try {
    const data = await sql`SELECT transaction_type, amount FROM transaction where user_id=${req.body.id}`;
    console.log(data);
    res.send(data);
  } catch (err) {
    console.log(err);
  }
};
export const postTransaction = async (req, res) => {
  const { payee, amount, switchOne, note, categoryId, id, date, time } =
    req.body;
  try {
    const newTransaction =
      await sql`INSERT INTO transaction(user_id, name, amount, transaction_type, description, transaction_time, transaction_date, category_id) VALUES(${id}, ${payee}, ${amount}, ${switchOne}, ${note}, ${time}, ${date}, ${categoryId}) RETURNING *`;
    res.send(newTransaction);
  } catch (err) {
    console.log(err);
  }
};
export const deleteTransaction = async (req, res) => {
  // const idList = req.body.map((id) => `'${id}'`).join(", ");
  try {
    // const newTransaction = await sql`DELETE FROM transaction
    //   WHERE id IN (${sql.raw(idList)})`;
    const newTransaction = await sql`DELETE FROM transaction
      WHERE id IN (${req.body.id})`;
    res.send({ seccess: true });
  } catch (err) {
    console.log(err);
  }
};
export const createTable = async (req, res) => {
  try {
    const data = await sql`CREATE TABLE ${sql(
      tableName
    )}(id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), 
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
