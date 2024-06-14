import bcrypt from "bcryptjs";
import User from "../models/User-model.js";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(errorHandler(409, "Email already in use"));
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const newUser = new User({ username, email, password: hash });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(errorHandler(401, "Invalid credentials"));
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return next(errorHandler(401, "Invalid credentials"));
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    // Removing the password before sending user data in the response
    const userData = { ...user._doc };
    delete userData.password;

    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      })
      .status(200)
      .json(userData);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  const { email, name, photo } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });

    if (user) {
      // Generate a token for existing user
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d",
      });

      const { password: _, ...userWithoutPassword } = user._doc;

      return res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        })
        .status(200)
        .json(userWithoutPassword);
    }

    // Create a new user if not found
    const username =
      name.split(" ").join("").toLowerCase() +
      Math.floor(Math.random() * 10000).toString();
    const password = Math.random().toString(36).slice(-12);

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      profilePicture: req.body.photo,
      password: hash,
    });

    await newUser.save();
    const expiryDate = new Date(Date.now() + 36000000);
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY, {
      expires: expiryDate,
    });

    const { password: _, ...userWithoutPassword } = newUser._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .status(201)
      .json(userWithoutPassword);
  } catch (error) {
    next(error);
  }
};

export const signout = async (req, res) => {
  try {
    // Clear the access_token cookie
    res.clearCookie("access_token", {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    // Optionally, clear other cookies if needed
    // res.clearCookie("refresh_token");

    // Respond with a success message
    res.status(200).json({ message: "Sign out success!" });
  } catch (error) {
    console.error("Error during sign out:", error);
    res.status(500).json({ error: "Failed to sign out" });
  }
};
