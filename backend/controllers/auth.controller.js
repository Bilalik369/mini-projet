import User from "../models/User.js";
import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

export const register = async(req, res) => {
  try {
    const { fullName, email, password, phone, address, image } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ msg: "Tous les champs sont obligatoires" });
    }

    const userExiste = await User.findOne({ email });
    if (userExiste) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const user = await User.create({ 
        fullName,
        email,
        password,
        phoneNumber: phone || "",
        address: address || "",
        image: image || "" 
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: "Registration successful",
      data: {
        user: user.toPublicJSON(),
        token,
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

export const login = async(req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: "Tous les champs sont obligatoires" });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ msg: "Invalid email or password" });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user: user.toPublicJSON(),
        token,
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};


export const getMe = async(req , res)=>{
    try {
        const user = await User.findOne(req.user._id)
        if(!user){
            return res.status(404).json({msg :'user not found'})
        }
        res.status(200).json({
            success : true,
            user: user.toPublicJSON(),
        })
    } catch (error) {
        console.error("Get profile error:", error.message)
        res.status(400).json({
        status: "error",
         message: error.message,
    })
    }
}