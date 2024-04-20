import Role from "../models/Role.js"
import User from "../models/User.js"
import UserToken from "../models/UserToken.js"
import bcrypt from "bcryptjs"
import nodemailer from "nodemailer";
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

export const sendEmail = async(req,res,next)=>{
    const email = req.body.email;
    const user = await User.findOne({email:{$regex:'^'+email+'$', $options:'i'}});
    if(!user){
        return next(createError(404,"User Not Found to reset for email address")); 
    }

    const payload = {
        email:user.email,
    };
    const expirytime = 300;
    const token = jwt.sign(payload,process.env.JWT_SECRET, {expiresIn:expirytime});
    const newToken = new UserToken({
        userId:user._id,
        token:token
    });
    const mailTransporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
        user: "muwaidyarathna@gmail.com",
        pass:"ywri vuvf cbhk zppb"
        }
    });
    let mailDeatails={
        from:"muwaidyarathna@gmail.com",
        to:email,
        subject:"Reset Password",
        html:`
        <html><head>
        <title>
        Password Reset Request
        </title>

        </head>

        <body>
        <h1>Password Reset Request</h1>
        <p>Dear ${user.userName}</p>
        <p>We have received a request to rest your password in your account with GuestBook App. To complete
        the password reset process, please click on the button bellow.</p>
        <a href=${process.env.APP_URL}/reset/${token}>
        <button style="background-color:green; color:white; padding:14px 20px; border:none; cursor:pointer; border-radius:4px">
        Reset Password</button></a>
        <p>Please note that this link will only valid for 5 minutes. </p>
        <p>If you did not request a password reset request, please disregard this email.</p>
        <p>Thank You.</p>
        </body>
        </html>`
    };
  mailTransporter.sendMail(mailDeatails, async(err,data)=>{
    if(err){
        console.log(err);
        return next(createError(500,"Internal Server Error"));
    }else{
        newToken.save();
        return next(createSuccess(200,"Mail Sent Successfully"));
    }
  });
};

export const resetPassword = async(req,res,next)=>{
        const token = req.body.token;
        const newPassword = req.body.password;
        jwt.verify(token, process.env.JWT_SECRET, async(err, data)=>{
            if(err){
                return next(createError(500,"Reset Link is Expired"+err));
                
            }else{
                const response = data;
                const user = await User.findOne({email:{$regex: '^'+response.email+'$',$options:'i'}});
                const salt = await bcrypt.genSalt(10);
                const encryptedPassword = await bcrypt.hash(newPassword, salt);
                user.password = encryptedPassword;
                try{
                    const updatedUser = await User.findOneAndUpdate(
                        {_id:user._id},
                        {$set:user},
                        {new:true},
                    );
                    return next(createSuccess(200,"Password Reset is Successfull"));
                }catch(error){
                    return next(createError(500,"Error occured while Resetting the Password"+error));
                }
            }

        });
    
}


