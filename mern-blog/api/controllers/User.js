import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { constants } from "../constants.js";


export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(constants.VALIDATION_ERROR.code).json({
        success: false,
        message: `${constants.VALIDATION_ERROR.message} All fields are mandatory`,
      });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(constants.VALIDATION_ERROR.code).json({
        success: false,
        message: `${constants.VALIDATION_ERROR.message} User already exists`,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hash,
    });

    newUser.save();
    if (newUser) {
      return res.status(constants.CREATED.code).json(newUser);
    } else {
      return res.status(constants.VALIDATION_ERROR.code).json({
        success: false,
        message: `${constants.VALIDATION_ERROR.message} User request was not completed`,
      });
    }
  } catch (error) {
    return res
      .status(constants.SERVER_ERROR.code)
      .json({ success: false, message: constants.SERVER_ERROR.message });
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(constants.VALIDATION_ERROR.code).json({
        success: false,
        message: `${constants.VALIDATION_ERROR.message} All fields are mandatory`,
      });
    }

    const user = await User.findOne({ email });
   

    if (user && (await bcrypt.compare(password, user.password))) {

      const token = jwt.sign(
        {
          user: {
            name: user.name,
            id: user._id,
          },
        },
        process.env.SECRET_KEY
      );

      return res
        .cookie("access_token", token, { httpOnly: true })
        .status(constants.OK.code)
        .json({id: user._id, name: user.name, email: user.email});
    } else {
      return res.status(constants.UNAUTHORIZED.code).json({
        success: false,
        message: `${constants.UNAUTHORIZED.message}- Invalid Credentials`,
      });
    }
  } catch (error) {
    return res
      .status(constants.SERVER_ERROR.code)
      .json({ success: false, message: constants.SERVER_ERROR.message });
  }
};

export const logoutUser = (req, res) => {
  console.log(req.cookies);
  return res
    .clearCookie("access_token", {})
    .status(200)
    .json("User has been logged out.");
};
