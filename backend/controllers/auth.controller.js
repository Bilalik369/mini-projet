import User from "../models/User.js";
import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

export const register = async(req, res) => {
  try {
    const { fullName, email, password, phoneNumber, address, image } = req.body;

    if (!fullName || !email || !password || !phoneNumber || !address || !image) {
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
        phoneNumber,
        address,
        image });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: "Registration successful",
      user: user.toPublicJSON(),
      token,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};
