import Role from "../models/Role.js"
import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { createError } from "../utils/error.js";
import { createSuccess } from "../utils/success.js";

export const registerUser = async(req,res,next)=>{
    const role = await Role.find({role:"User"});
    const salt = await bcrypt.genSalt(10);
    const hashedPasswd = await bcrypt.hash(req.body.password,salt);
    const newUser = new User({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        userName:req.body.userName,
        email:req.body.email,
        password:hashedPasswd,
        roles:role
    });
    await newUser.save();
    return next(createSuccess(200,"User Registered Successfully"));
};

export const registerAdmin = async(req,res,next)=>{
    const role = await Role.find({});
    const salt = await bcrypt.genSalt(10);
    const hashedPasswd = await bcrypt.hash(req.body.password,salt);
    const newUser = new User({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        userName:req.body.userName,
        email:req.body.email,
        password:hashedPasswd,
        isAdmin:true,
        roles:role
    });
    await newUser.save();
    return next(createSuccess(200,"Admin Registered Successfully"));
};

export const loginUser = async(req,res,next)=>{
    try{
        const user = await User.findOne({email:req.body.email})
        .populate("roles", "role");
        const {roles} = user;
        if(!user){
            return next(createError(404,"User Not Found"));
        }
        const isPasswdCorrect = await bcrypt.compare(req.body.password, user.password);
        if(!isPasswdCorrect){
            return next(createError(400,"Password is incorrect"));
        }
        const token = jwt.sign({id:user._id, isAdmin:user.isAdmin, roles:roles}, 
            process.env.JWT_SECRET);
        res.cookie("access_token",token,{httpOnly:true})
        .status(200)
        .json({status:200,
            message:"Login Success",
            data: user
        });
    }catch(error){
        return next(createError(500,"Internal Server Error"));
    }
    
};
