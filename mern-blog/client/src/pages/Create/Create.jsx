import React, { useState } from "react";
import "./Create.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Create = () => {
  const navigate = useNavigate(); // Use the navigate hook
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [value, setValue] = useState("");
  const [category, setCategory] = useState("tech"); // default category
  const { currentUser } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const post = new FormData();
    post.append("title", title);
    post.append("description", value);
    post.append("category", category);
    post.append("image", file);
    post.append("user", currentUser.id);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/post/publish",
        post,
        {
          withCredentials: true,
        }
      );
      console.log(response);
      // Navigate to the created post
      navigate(`/post/${response.data._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="create-container">
      {currentUser ? (
        <form className="blog-form" onSubmit={handleSubmit}>
          <div className="create-text">
            <h2 className="write-as">Write as {currentUser.name}</h2>
            <input
              type="text"
              className="blog-title"
              value={title}
              onChange={(ev) => setTitle(ev.target.value)}
              placeholder="Blog Title Here"
            />
            <ReactQuill
              className="blog-description"
              theme="snow"
              value={value}
              onChange={setValue}
              placeholder="Write your blog here..."
              
             
            />
          </div>
          <div className="create-options">
            <div className="category-menu">
              {["tech", "health", "finance", "anime", "other"].map((cat) => (
                <React.Fragment key={cat}>
                  <input
                    type="radio"
                    name="category"
                    id={cat}
                    value={cat}
                    checked={category === cat}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                  <label htmlFor={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </label>
                </React.Fragment>
              ))}
            </div>

            <input
              type="file"
              className="file-input"
              name="file"
              id="file"
              onChange={handleFileChange}
            />
            <label htmlFor="file" className="file-label">
              Upload a Picture
            </label>
            <button type="submit" className="publish-btn">
              Publish
            </button>
          </div>
          <div className="file-preview">
            {file ? (
              <span className="filename">Filename: {file.name}</span>
            ) : (
              <span>No Picture Chosen</span>
            )}
          </div>
        </form>
      ) : (
        <h2 className="login-message">
          <Link to={"/login"} className="login-link">
            Login to Create
          </Link>
        </h2>
      )}
    </div>
  );
};

export default Create;
