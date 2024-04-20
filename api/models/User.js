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

);

export default mongoose.model("User", UserSchema);
