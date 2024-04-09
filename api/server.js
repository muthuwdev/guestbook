// const app = require("./app");
// const cloudinary = require("cloudinary");
// const connectDatabase = require("./config/database");

// // Handling Uncaught Exception
// process.on("uncaughtException", (err) => {
//   console.log(`Error: ${err.message}`);
//   console.log(`Shutting down the server due to Uncaught Exception`);
//   process.exit(1);
// });

// // Config
// if (process.env.NODE_ENV !== "PRODUCTION") {
//   require("dotenv").config({ path: "backend/config/config.env" });
// }

// // Connecting to database
// connectDatabase();

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const server = app.listen(process.env.PORT, () => {
//   console.log(`Server is working on http://localhost:${process.env.PORT}`);
// });

// // Unhandled Promise Rejection
// process.on("unhandledRejection", (err) => {
//   console.log(`Error: ${err.message}`);
//   console.log(`Shutting down the server due to Unhandled Promise Rejection`);

//   server.close(() => {
//     process.exit(1);
//   });
// });

// import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";


// const app = express();
dotenv.config({path:"config/config.env"});

// import connectDatabase from "config/database";
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