import express from "express";
const app = express();
import roleRoute from "./routes/role.js";
import authRoute from "./routes/auth.js";
import cors from 'cors'
import userRoute from "./routes/user.js";
import cookieParser from "cookie-parser";
import path from "path";


app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:'http://localhost:4200',
    credentials:true
}));

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


export default app;
