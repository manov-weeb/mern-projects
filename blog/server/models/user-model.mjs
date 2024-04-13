import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: [true, "Please add the user name"] },
    email: {
      type: String,
      required: [true, "Please add the user email"],
      unqiue: [
        true,
        "User with the email already exists. Try Logging in instead?",
      ],
    },
    password: {
      type: String,
      required: [true, "Please enter the password"],
    },
    img: {
      type: String,
      default:
        "https://i.pinimg.com/564x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;