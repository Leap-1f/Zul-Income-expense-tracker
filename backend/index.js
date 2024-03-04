import express from "express";
import cors from "cors";
// import { user } from "./mock/user.js";
import { sql } from "./config/database.js";
import { user } from "./src/router/user.js";

const app = express();
const port = 9090;
app.use(cors());
app.use(express.json());

app.use("/users", user)
// app.get("/users", async (req, res) => {
//   const data = await sql`SELECT * FROM users`;
//   console.log(data);
//   res.send(data);
// });
app.post("/users", async (req, res) => {
  const data = await sql`SELECT * FROM users`;
  const newUser = await sql`INSERT INTO users(name, email) VALUES('hi', 'zula') RETURNING *`;
  data.push(newUser)
  console.log(data);
  res.send(data);
});
app.post("/users/createTable", async (req, res) => {
  const data = await sql`CREATE TABLE data(id SERIAL PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL)`;
  console.log(data);
  res.send(data);
});
app.delete ("/users/dropTable", async (req, res) => {
  const data = await sql`DROP TABLE data`;
  console.log(data);
  res.send("deleted");
});

app.listen(port, () => {
  console.log(`ene port deer server  aslaa http://localhost:${port}`);
});
// return to login