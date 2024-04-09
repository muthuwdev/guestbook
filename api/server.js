import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";

dotenv.config({path:"config/config.env"});

import connectDatabase from "./config/database.js";


// Connecting to database
connectDatabase();


app.use('/api/login',(req, res)=>{
  return res.send("Hello Welcome to MEAN Stack Login")
});

app.use('/api/register',(req, res)=>{
  return res.send("Hello Welcome to MEAN Stack Register")
});

app.use('/',(req, res)=>{
  return res.send("Hello Welcome to MEAN Stack")
});
app.listen(process.env.PORT, ()=>{
  console.log(`Connected to backend ${process.env.PORT}`);
})