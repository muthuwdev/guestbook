import express from "express";
const app = express();
import roleRoute from "./routes/role.js";
import authRoute from "./routes/auth.js";
import cors from 'cors'
import userRoute from "./routes/user.js";

import cookieParser from "cookie-parser";
// import bodyParser from "body-parser";
// import fileUpload from "express-fileupload";
import path from "path";

// const errorMiddleware = require("./middleware/error");

// // Config
// if (process.env.NODE_ENV !== "PRODUCTION") {
//   require("dotenv").config({ path: "backend/config/config.env" });
// }

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:'http://localhost:4200',
    credentials:true
}));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(fileUpload());

// // Route Imports
// const product = require("./routes/productRoute");
// const user = require("./routes/userRoute");
// const order = require("./routes/orderRoute");
// const payment = require("./routes/paymentRoute");

// app.use("/api/v1", product);
// app.use("/api/v1", user);
// app.use("/api/v1", order);
// app.use("/api/v1", payment);

app.use("/api/role", roleRoute);
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

//Response Handler Middleware

app.use((obj, req, res, next)=>{
    const statusCode = obj.status || 500;
    const message = obj.message || "Something went wrong";
    return res.status(statusCode).json({
        success:[200,201,204].some(a=>a===obj.status)? true :false,
        status:statusCode,
        message:message,
        data:obj.data
    });
});

// app.use(express.static(path.join(__dirname, "../frontend/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
// });

// // Middleware for Errors
// app.use(errorMiddleware);

export default app;
