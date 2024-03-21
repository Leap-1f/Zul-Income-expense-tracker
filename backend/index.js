import express from "express";
import cors from "cors";
import { user } from "./src/router/user.js";
import { transaction } from "./src/router/transaction.js";
import { category } from "./src/router/category.js";
import { login } from "./src/controller/user.js";
import jwt from "jsonwebtoken";

const app = express();
const port = 9090;
app.use(cors());
app.use(express.json());

// const logRequest = (req, res, next) => {
//   console.log("req.method", req.method);
//   const authHeader = req.headers.authorization;

//   console.log(authHeader, " -------------------------");

//   if (authHeader && authHeader.startsWith("Bearer ")) {
//     // Extract the token part of the Authorization header
//     const token = authHeader.substring(7);
//     try {
//       jwt.verify(token, process.env.JWT_SECRET);
//     } catch (exp) {
//       console.log(exp, " is eexp");
//       res.send("bearer token is invalid");
//       // res.send(`Bearer token: ${token}`);
//       return;
//     }
//     // res.send(`Bearer token: ${token}`);
//   } else {
//     res.send("No bearer token provided");
//   }

//   if (req.body.name === "bat") {
//     res.send("batig orulahgu");
//   }
//   next();
// };
// middleware, authorization

// app.post(logRequest); 
app.use("/api/", user);
app.use("/api", category);
app.use("/api/transaction", transaction);

app.listen(port, () => {
  console.log(`ene port deer server  aslaa http://localhost:${port}`);
});
// return to login
