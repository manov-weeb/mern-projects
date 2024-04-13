import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../store/post-slice";

const Home = () => {
  const { posts, status, error } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  const query = useLocation().search;

  useEffect(() => {
    dispatch(fetchPosts(query));
  }, [dispatch, query]); // No need to include fetchPosts here, as it's not a dependency

  // Checking for loading state
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  // Checking for error state
  if (status === "error") {
    return <div>Error: {error}</div>;
  }

  // Render posts
  return (
    <div className="home">
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post._id}>
            <div className="img-container">
              <img src={post.image} alt="Post Image" />
            </div>
            <div className="post-content">
              <Link to={`/post/${post._id}`}>
                <h2>{post.title}</h2>
              </Link>
              <p>{post.description}</p>
              <Link to={`/post/${post._id}`}><button >Read More</button></Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
