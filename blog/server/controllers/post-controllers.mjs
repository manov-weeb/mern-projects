import Post from "../models/post-model.mjs";
import jwt from "jsonwebtoken";

export const getPosts = async (req, res) => {
  const category = req.query.cat;
  let posts;
  try {
    if (category) {
      posts = await Post.find({ category });
    } else {
      posts = await Post.find();
    }

    if (posts) {
      console.log(req.cookies);
      return res.status(200).json(posts);
    }

    return res.status(404).json({
      success: "true",
      message: "Search was succesful, but not posts found :(",
    });
  } catch (error) {
    console.log(error);
    return res.cookie("cookie", "new_cookie").status(500).json({
      success: "false",
      message: "Some Internal Server Error Occured",
    });
  }
};

export const getPost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  try {
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found." });
    }
    return res.json(post);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: "false",
      message: "Some Internal Server Error Occured",
    });
  }
};


export const addPost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Not Authenticated" });
  }

  // If the user is authenticated, extract the necessary data from the request body
  const { title, description, category, image, user } = req.body;

  // Assuming you have a User model and the user ID is stored in the token
  // const userId = getUserIdFromToken(token);

  // Create a new post object using the data extracted from the request body
  const newPost = new Post({
    title,
    description,
    category,
    image,
    user,
  });
 
  // Save the new post to the database
  newPost
    .save()
    .then((post) => {
      // If the post is successfully saved, return a success response
      return res.status(201).json({ success: true, post });
    }) 
    .catch((error) => {
      // If an error occurs while saving the post, return an error response
      console.error(error);
      return res
        .status(500)
        .json({ success: false, message: "Failed to add post" });
    });
};

export const deletePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) { 
    return res
      .status(401)
      .json({ success: false, message: "Not Authenticated" });
  }

  // Verification of token is handled by the verifyToken middleware
  // If token is valid, it attaches user information to the request object (req.user)
  // You can access user information from req.user in this function

  // Here you would proceed with deleting the post
  const postId = req.params.id;
  Post.findByIdAndDelete(postId, (err) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: "Failed to delete post" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Post deleted successfully" });
  });
};

export const updatePost = (req, res) => {
  return res.json({});
};
