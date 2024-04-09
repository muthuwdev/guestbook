import mongoose,{Schema} from "mongoose";

const UserSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
    required: [true, "Please Enter First Name"],
  },
  lastName: {
    type: String,
    required: [true, "Please Enter Last Name"],
    unique: true,
  },
  userName: {
    type: String,
    required: [true, "Please Enter Your Username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [8, "Password should be greater than 8 characters"],
    // select: false,
  },
  profileImage: {
    type: String,
    required: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  roles: {
    type: [Schema.Types.ObjectId],
    required: true,
    ref:"Role"
  }
},
   {
    timestamps:true
  },

//   resetPasswordToken: String,
//   resetPasswordExpire: Date,
);

export default mongoose.model("User", UserSchema);

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     next();
//   }

//   this.password = await bcrypt.hash(this.password, 10);
// });

// // JWT TOKEN
// userSchema.methods.getJWTToken = function () {
//   return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRE,
//   });
// };

// // Compare Password

// userSchema.methods.comparePassword = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };

// // Generating Password Reset Token
// userSchema.methods.getResetPasswordToken = function () {
//   // Generating Token
//   const resetToken = crypto.randomBytes(20).toString("hex");

//   // Hashing and adding resetPasswordToken to userSchema
//   this.resetPasswordToken = crypto
//     .createHash("sha256")
//     .update(resetToken)
//     .digest("hex");

//   this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

//   return resetToken;
// };

// module.exports = mongoose.model("User", userSchema);
