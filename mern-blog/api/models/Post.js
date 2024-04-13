import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    title: { type: String, required: [true, "Title cannot be left empty"] },
    description: {
      type: String,
      required: [true, "Description cannot be left empty"],
    },
    image: { type: String, default: "" },
    category: { type: String, required: true },
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
