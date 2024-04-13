import { constants } from "../constants.js";
import Post from "../models/Post.js";
import jwt from "jsonwebtoken";
import fs from "fs";

export const getAllPosts = async (req, res, next) => {
  try {
    const { category } = req.query;
    let posts;
    if (category) {
      posts = await Post.find({ category })
        .populate("user", ["_id", "name"])
        .sort({ createdAt: -1 });
    } else {
      posts = await Post.find()
        .populate("user", ["_id", "name"])
        .sort({ createdAt: -1 });
    }

    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(constants.SERVER_ERROR.code).json({
      success: false,
      message: constants.SERVER_ERROR.message,
    });
  }
};

export const getPost = async (req, res, next) => {
  try {
    const post = await Post.findOne({ _id: req.params.id }).populate(
      "user",
      ["_id", "name"]
    );
    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(constants.SERVER_ERROR.code).json({
      success: false,
      message: constants.SERVER_ERROR.message,
    });
  }
};

export const publishPost = async (req, res, next) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const imgPath = path + "." + ext;
  fs.renameSync(path, imgPath);

  const { access_token } = req.cookies;
  jwt.verify(access_token, process.env.SECRET_KEY, {}, async (err, info) => {
    if (err) {
      throw err;
    }

    const { title, description, category, user } = req.body;

    const newPost = await Post.create({
      title,
      description,
      category,
      image: imgPath,
      user,
    });
    res.json(newPost);
  });
};

export const editPost = async (req, res, next) => {
  let newPath = null;

  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }

  const { access_token } = req.cookies;

  try {
    const userInfo = jwt.verify(access_token, process.env.SECRET_KEY);

    const { id, title, description } = req.body;
    const post = await Post.findById(id);

    if (!post) {
      return res.status(constants.NOT_FOUND.code).json({
        success: false,
        message: `${constants.NOT_FOUND.message} Post not found`,
      });
    }

    const isAuthor =
      JSON.stringify(post.user) === JSON.stringify(userInfo.user.id);

    if (!isAuthor) {
      return res.status(constants.BAD_REQUEST.code).json({
        success: false,
        message: "Wrong Author",
        postUser: post.user,
        actualUser: userInfo.user.id,
      });
    }

    post.title = title;
    post.description = description;
    post.image = newPath ? newPath : post.image;

    await post.save();

    res.json(post);
  } catch (error) {
    console.error("Error editing post:", error);
    return res.status(constants.SERVER_ERROR.code).json({
      success: false,
      message: constants.SERVER_ERROR.message,
    });
  }
};

export const deletePost = async () => {};
