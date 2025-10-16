import mongoose from "mongoose";
import bcrypt from "bcrypt"


const userSchema = new mongoose.Schema({
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: [2, "Full name must be at least 2 characters"],
      maxlength: [100, "Full name cannot exceed 100 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },

    password :{
        type : String,
        required : true,
        minlength: [6, "Password must be at least 6 characters"],
        select: false,
        

    },  phoneNumber: {
      type: String,
      trim: true,
      default: "",
    },

    address: {
      type: String,
      trim: true,
      default: "",
    },

     image: {
      type: String,
      default: "",
    },

}, {timestamps: true,})

userSchema.pre('save', async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword , this.password)
}

userSchema.methods.toPublicJSON = function () {
  return {
    id: this._id,
    fullName: this.fullName,
    email: this.email,
    phoneNumber: this.phoneNumber,
    address: this.address,
    image: this.image,
    createdAt: this.createdAt,
  }
}

const User = mongoose.model("User", userSchema)

export default User