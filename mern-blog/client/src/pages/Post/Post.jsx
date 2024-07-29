import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navbar } from "../../components";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Post.css";

const Post = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({});
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/post/${id}`
        );
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    getPost();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/post/${id}`, {
        withCredentials: true,
      });
      navigate("/");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <>
      <Navbar />
      <div className="post-container">
        <div className="post-content">
          <h1 className="post-title">{post.title}</h1>
          {currentUser.id === post.user?._id && (
            <div className="post-buttons">
              <Link to={`/edit/${post._id}`} className="edit-btn">
                Edit
              </Link>
              <button className="delete-btn" onClick={handleDelete}>
                Delete
              </button>
            </div>
          )}
          <img
            src={"http://localhost:5000/" + post.image}
            alt={post.title}
            className="post-image"
          />
          <div
            className="single-post-description"
            dangerouslySetInnerHTML={{ __html: post.description }}
          ></div>
          <p className="post-author">Author: {post.user?.name}</p>
          <p className="post-date">Posted on: {formatDate(post.createdAt)}</p>
        </div>
      </div>
    </>
  );
};

export default Post;
