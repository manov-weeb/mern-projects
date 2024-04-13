import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navbar } from "../../components";
import { Link, useParams } from "react-router-dom";
import {useSelector} from "react-redux"

const Post = () => {
  const {id} = useParams();
  const [post, setPost] = useState({});
  const { currentUser } = useSelector((state) => state.user);


  useEffect(() => {
    const getPost = async () => {
      const response = await axios.get(
        `http://localhost:5000/api/v1/post/${id}`
      );
      console.log(response.data.user._id);
      setPost(response.data)
    };

    getPost();
  }, []);
  return (
    <>
      <Navbar />
      <div>
        <div><h1>{post.title}</h1>
        { (currentUser.id === post.user?._id) && <div > <Link to={`/edit/${post._id}`}> <button>Edit</button></Link> <button> Delete</button></div> 

        }
        <img src={"http://localhost:5000/" + post.image} alt={post.title} />
        <div div dangerouslySetInnerHTML={{__html: post.description}}></div>
     <a> Author: {post.user?.name}</a>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default Post;
