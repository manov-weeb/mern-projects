import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Posts.css";
import { Link, useLocation } from "react-router-dom";

const Posts = () => {
  const category = useLocation().search;
  const [posts, setPosts] = useState([]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const truncateDescription = (description) => {
    const words = description.split(' ');
    if (words.length > 50) {
      return words.slice(0, 50).join(' ') + '...';
    }
    return description;
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/post/posts${category}`,
          { withCredentials: true }
        );
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error); 
      }
    };

    fetchPosts();
  }, [category]); 

  return (
    <div className="posts-container">
      {posts.map((post) => (
        <div className="post" key={post._id}>
          <div className="post-img">
            <img src={"http://localhost:5000/" + post.image} alt={post.title} />
          </div>
          <div className="post-content">
            <h3>{post.title}</h3>
            <div className="post-author-date">
              Author: {post.user.name} | {formatDate(post.createdAt)}
            </div>
            <div 
              className="post-description"
              dangerouslySetInnerHTML={{ __html: truncateDescription(post.description) }}
             ></div>
          </div>
          <Link to={`post/${post._id}`} className="read-more-link">
            Read More
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Posts;
