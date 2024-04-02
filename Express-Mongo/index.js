// npm i express --save
// npm i mongoose --save
import express from "express";
import mongoose from "mongoose";

const PORT = 8080;
const app = express();

const MONGO_CONNECTION_STRING =
  "mongodb+srv://zulsar199:leap@leap-1.pu1hhrx.mongodb.net/";

mongoose
  .connect(MONGO_CONNECTION_STRING)
  .then(() => console.log(`database connected successfully`))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("ajillaaa");
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
