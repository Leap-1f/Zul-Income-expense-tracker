import express from "express";
import cors from "cors";
import { user } from "./src/router/user.js";
import { transaction } from "./src/router/transaction.js";
import { category } from "./src/router/category.js";

const app = express();
const port = 9090;
app.use(cors());
app.use(express.json());

app.use("/api", user);
app.use("/api/category", category);
app.use("/api/transaction", transaction);


app.listen(port, () => {
  console.log(`ene port deer server  aslaa http://localhost:${port}`);
});
// return to login
