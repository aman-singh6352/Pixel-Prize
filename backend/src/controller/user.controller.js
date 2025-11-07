import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/util.js";
import { cloudinary } from "../lib/cloudinary.js";

export const signup = async (req, res) => {
  const { fullName, email, password, confirmPassword } = req.body;
  try {
    if (!fullName || !email || !password)
      return res.status(400).json({ message: "All field are required" });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords do not match" });

    if (password.length < 6)
      return res
        .status(400)
        .json({ message: "Password must be at least of 6 characters" });

    const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    email.trim().toLowerCase();
    if (!emailregex.test(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exist!" });
    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = new User({
      fullName,
      email,
      password: hashedPass,
    });
    if (newUser) {
      const savedUser = await newUser.save();
      generateToken(savedUser._id, res);
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
      });
    } else res.status(400).json({ message: "Invalid user data" });
  } catch (err) {
    if (err?.code === 11000 && (err.keyPattern?.email || err.keyValue?.email)) {
      return res.status(409).json({ message: "Email already exists" });
    }
    return res
      .status(500)
      .json({ message: "Internal server error" + err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password)
      return res.status(400).json({ message: "All fields are required" });
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials!" });
    // never tell the client which one is incorrect
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials!" });
    generateToken(user._id, res);
    res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (err) {
    console.log("Error in the :: login controller:", err.message);
    res.status(500).json({ message: "Internal server error!" });
  }
};

export const logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).json({ message: "Logged out successfully!" });
};

export const updateProfile = async (res, req) => {
  try {
    const { profilePic } = req.body;
    if (!profilePic)
      return res.status(400).json({ message: "Profile pic is required!" });
    const userId = req.user._id;
    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );
    if (updatedUser) return res.status(200).json(updatedUser);
  } catch (error) {}
};
