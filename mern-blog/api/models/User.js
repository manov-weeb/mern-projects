import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: [true, "Name cannot be left empty"] },
  email: {
    type: String,
    required: [true, "Please add the user email"],
    unqiue: [
      true,
      "User with the email already exists. Try Logging in instead?",
    ],
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "This is not a valid email"]
  },
  password: {
     type: String,
     required: [true, "Please enter the password"],
   },
});

export default mongoose.model("User", userSchema)