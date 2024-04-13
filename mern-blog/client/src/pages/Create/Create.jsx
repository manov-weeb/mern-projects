import React, { useState } from "react";
import "./Create.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import axios from "axios";

const Create = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [value, setValue] = useState("");
  const [category, setCategory] = useState("");
  const { currentUser } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    const post = new FormData();
    post.set("title", title);
    post.set("description", value);
    post.set("category", category);
    post.set("image", file[0]);
    post.set("user", currentUser.id)

    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/post/publish",
        post,
        {
          withCredentials: true,
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(currentUser.id)

  return (
    <>
      {currentUser ? (
        <form className="blog-form">
          <div className="create-text">
            Write as {currentUser.name}
            <input
              type="text"
              value={title}
              onChange={(ev) => setTitle(ev.target.value)}
              placeholder="Blog Title Here"
            ></input>
            <ReactQuill
              className="blog-description"
              theme="snow"
              value={value}
              onChange={setValue}
            />
          </div>
          <div className="create-options">
            <div className="category-menu">
              <input
                checked={category === "tech"}
                type="radio"
                name=""
                id="tech"
                value={"tech"}
                onChange={(e) => setCategory(e.target.value)}
              />
              <label htmlFor="tech">Tech</label>
              <input
                checked={category === "health"}
                type="radio"
                name=""
                id="health"
                value={"health"}
                onChange={(e) => setCategory(e.target.value)}
              />
              <label htmlFor="health">Health</label>
              <input
                checked={category === "finance"}
                type="radio"
                name=""
                id="finance"
                value={"finance"}
                onChange={(e) => setCategory(e.target.value)}
              />
              <label htmlFor="tech">Finance</label>
              <input
                checked={category === "art"}
                type="radio"
                name=""
                id="art"
                value={"art"}
                onChange={(e) => setCategory(e.target.value)}
              />
              <label htmlFor="tech">Art</label>
              <input
                checked={category === "other"}
                type="radio"
                name=""
                id="other"
                value={"other"}
                onChange={(e) => setCategory(e.target.value)}
              />
              <label htmlFor="tech">Other</label>
            </div>
            <input
              type="file"
              name="file"
              id=""
              onChange={(ev) => setFile(ev.target.files)}
            />
            <button className="publish-btn" onClick={handleSubmit}>
              Publish
            </button>
          </div>
        </form>
      ) : (
        <h2>
          {" "}
          <Link to={"/login"}>Login to Create </Link>
        </h2>
      )}
    </>
  );
};

export default Create;
