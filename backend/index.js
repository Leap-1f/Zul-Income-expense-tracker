import express from "express";
import cors from "cors";
import { user } from "./src/router/user.js";
import { transaction } from "./src/router/transaction.js";
import { category } from "./src/router/category.js";


const app = express();
const port = 9090;
app.use(cors());
app.use(express.json());




const logRequest = (req, res, next) => {
  console.log("req.method", req.method);
  if(req.body.name === "bat"){
    res.send("batig orulahgu")
  }
  next()
}
// middleware, authorization


app.use(logRequest);
app.use("/api/", user);
app.use("/api", category);
app.use("/api/transaction", transaction);

app.listen(port, () => {
  console.log(`ene port deer server  aslaa http://localhost:${port}`);
});
// return to login
