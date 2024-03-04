import { sql } from "../../config/database";

export const getAllUsers = async (req, res) =>{
  try{
    const data = await sql`SELECT * FROM users`;
  console.log(data);
  res.send(data);
  } catch (err) {
    console.log(err);
  }
}