import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, default: "other" },
    image: {
      type: String,
      default:
        "https://soliloquywp.com/wp-content/uploads/2016/08/How-to-Set-a-Default-Featured-Image-in-WordPress.png",
    },
    user: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      username: { type: String, required: true },
      img: {
        type: String,
        default:
          "https://i.pinimg.com/564x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg",
      },
    },
  },
  { timestamps: true }
);
 
const Post = mongoose.model("Post", postSchema);
export default Post;
