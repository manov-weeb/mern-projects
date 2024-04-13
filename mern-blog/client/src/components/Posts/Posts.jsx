import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Posts.css";
import { Link, useLocation } from "react-router-dom";

const Posts = () => {
  const category = useLocation().search;
  console.log(category);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/post/posts${category}`,
          { withCredentials: true }
        );
        console.log(response.data);
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [category]);

  return (
    <div className="posts-div">
      {posts.map((post) => (
        <div className="post" key={post._id}>
          <div className="post-img">
            <img src={"http://localhost:5000/" + post.image} alt={post.title} />
          </div>
          <div className="post-content">
            <h3>{post.title}</h3>
            <a>
              {" "}
              Author: {post.user.name} {post.createdAt}
            </a>
            <p dangerouslySetInnerHTML={{ __html: post.description }}></p>
            <Link to={`post/${post._id}`}>
              {" "}
              <button>Read More</button>{" "}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
