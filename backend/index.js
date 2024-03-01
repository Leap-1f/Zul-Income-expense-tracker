import express from "express";
import cors from "cors";
import { user } from "./mock/user.js";

const app = express();
const port = 9090;
app.use(cors());
app.use(express.json());

app.get("/user", (req, res) => {
  res.send(user);
});

app.listen(port, () => {
  console.log(`ene port deer server  aslaa http://localhost:${port}`);
});
