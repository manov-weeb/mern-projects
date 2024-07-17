import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: "1d" } // Token valid for 1 day
  );
};

// User Signup
export const signup = async (req, res) => {
  const { name, username, email, password } = req.body;

  if (!name || !username || !email || !password) {
    return res.status(400).json({ message: "All fields are mandatory." });
  }

  try {
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const existingUserByUsername = await User.findOne({ username });
    if (existingUserByUsername) {
      return res.status(400).json({ message: "Username already in use" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = new User({ name, email, username, password: hashedPassword });

    const savedUser = await newUser.save();
    if (savedUser) {
      const token = generateToken(savedUser._id);
      res.cookie("access_token", token, { httpOnly: true, secure: true, sameSite: "Strict" });

      return res.status(201).json({ token, userData: { userId: savedUser._id, username: savedUser.username, email: savedUser.email, name: savedUser.name } });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// User Login
export const login = async (req, res) => {
  const { emailOrUsername, password } = req.body;

  if (!emailOrUsername || !password) {
    return res.status(400).json({ message: "Incomplete credentials received" });
  }

  try {
    const user = await User.findOne({ $or: [{ email: emailOrUsername }, { username: emailOrUsername }] });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id);
    res.cookie("access_token", token, { httpOnly: true, secure: true, sameSite: "Strict" });

    const userData = { ...user._doc };
    delete userData.password;

    return res.status(200).json({ token, userData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Google Signup
export const googleSignup = async (req, res) => {
  const { email, name, photo } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      const token = generateToken(user._id);
      res.cookie("access_token", token, { httpOnly: true, secure: true, sameSite: "Strict" });

      return res.status(200).json({ token, userData: { userId: user._id, username: user.username, email: user.email, name: user.name, profilePicture: user.profilePicture } });
    }

    const username = `${name.split(" ").join("").toLowerCase()}${Math.floor(Math.random() * 100000)}`;
    const password = Math.random().toString(36).slice(-12);

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = new User({ name, email, username, profilePicture: photo, password: hashedPassword });
    const savedUser = await newUser.save();

    const token = generateToken(savedUser._id);
    res.cookie("access_token", token, { httpOnly: true, secure: true, sameSite: "Strict" });

    const userData = { ...savedUser._doc };
    delete userData.password;

    return res.status(201).json({ token, userData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// User Logout
export const logout = (req, res) => {
  try {
    res.clearCookie("access_token");
    return res.status(200).json({ message: "Successfully logged out" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
