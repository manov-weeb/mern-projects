import User from "../models/user-model.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { username, email, password, img } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all required fields" });
  }

  const MIN_PASSWORD_LENGTH = 8;
  if (password.length < MIN_PASSWORD_LENGTH) {
    return res.status(400).json({
      success: false,
      message: `Password must contain ${MIN_PASSWORD_LENGTH} characters`,
    });
  }

  try {
    //Check if the user already exists
    let existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: `The User Already Exists`,
      });
    }

    //hash the password before saving to db
    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Occured." });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please Provide all the required fields",
    });
  }

  let existingUser;

  try {
    existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "Wrong Credentials!" });
    }

    const isPasswordCorrect = bcrypt.compareSync(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ success: false, message: "Wrong Credentials!" });
    }

    const accessToken = jwt.sign(
      {
        user: {
          username: existingUser.username,
          email: existingUser.email,
          id: existingUser._id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("access_token", accessToken, { httpOnly: true, path: "/" });
    return res.status(200).json({
      id: existingUser._id,
      username: existingUser.username,
      email: existingUser.email,
      img: existingUser.img,
    });

    //     return res.status(200).json({
    //       success: true,
    //       message: `Login Successful, Hello ${existingUser.username} \n Access Token: ${accessToken}`,
    //     });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Some Internal Server Error Occured" });
  }
};

export const logout = (req, res) => {
  console.log(req.cookies);
  return res
    .clearCookie("access_token", {})
    .status(200)
    .json("User has been logged out.");
};
