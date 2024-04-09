import mongoose from "mongoose";
// const validator = require("validator");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const crypto = require("crypto");

const RoleSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
  }
},

   {
    timestamps:true
  },
);

export default mongoose.model("Role", RoleSchema);

