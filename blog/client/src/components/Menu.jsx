import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../store/post-slice";

const Menu = () => {
  const { posts, status, error } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts( ));
  }, [dispatch]);
  return (
    <div className="menu">
      <h1>Other Posts You May Like</h1>
      {posts.map((post) => (
        <div className="post" key={post._id}>
          <img src={post.image} alt="post img" />
          <h2>{post.title}</h2>
          <button> Read More </button>
        </div>
      ))}
    </div>
  );
};

export default Menu;
