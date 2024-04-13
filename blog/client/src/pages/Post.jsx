import React, { useEffect, useState } from "react";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import { useSelector } from "react-redux";

const Post = () => {
  const [post, setPost] = useState({});

  const location = useLocation();
  const postId = location.pathname.split("/")[2];
  console.log(postId);

  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.auth);
  


  useEffect(() => {
    const fetchPost = async () => { 
      try {
        const response = await fetch(
          `http://localhost:5000/api/v1/posts/${postId}`
        );
        const data = await response.json();
        console.log(data);
        setPost(data);
      } catch (error) {
        console.log(err);
      }
    };

    fetchPost();
  }, [postId]);

  const handleDelete = async () => {
    const deleteUrl = `http://localhost:5000/api/v1/posts/${postId}`;
    const deleteOptions = {
      method: "DELETE",
    };
    try {
      await fetch(deleteUrl, deleteOptions);
      console.log("deleted")
      navigate("/");
    } catch (error) {
      console.log(error)
    }
  };

  console.log(post.user?.username)


  return (
    <div className="single-post">
      <div className="single-post-content">
        <img src={post.image} alt="Post Image" />
        <div className="post-user">
          <img
            src="https://images.pexels.com/photos/894156/pexels-photo-894156.jpeg"
            alt=""
          />
          <div className="user-info">
            <span>{post.user?.username}</span>
            <p>Posted 2 days ago</p>
          </div>
          {currentUser.username === post.user?.username && (
            <div className="edit-and-delete">
              <Link to={`/create?edit=2`} state={post}>
                <img src={Edit} alt="edit" />
              </Link>
              <Link to={`/create?edit=2`}>
                <img onClick={handleDelete} src={Delete} alt="delete" />
              </Link>
            </div>
          )}
        </div>
        <h1> {post.title}</h1>
        {post.description}
      </div>
      <Menu cat = {post.category}></Menu>
    </div>
  );
};

export default Post;
