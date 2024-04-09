import Role from "../models/Role.js"
import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { createError } from "../utils/error.js";
import { createSuccess } from "../utils/success.js";

export const getAllUsers = async(req,res,next)=>{
    try{
        const users = await User.find();
        return next(createSuccess(200,"All Users",users));
    }catch(error){
        return next(createError(500,"Internal Server Error"));
    }
};

export const findUserById = async(req,res,next)=>{
    try{
        const user = await User.findById(req.params.id);
        if(!user){
            return next(createError(404,"User Not Found")); 
        }
        return next(createSuccess(200,"User Found",user));
    }catch(error){
        return next(createError(500,"Internal Server Error"));
    }
};

