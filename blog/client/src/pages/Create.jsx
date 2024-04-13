import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const Create = () => {
  const state = useLocation().state;
  const [title, setTitle] = useState(state?.title || "");
  const [value, setValue] = useState(state?.description || "");
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState(state?.category || "");

  const { currentUser, status } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(currentUser);
    console.log({
      title,
      description: value,
      category,
      image: file
        ? file.name
        : "https://soliloquywp.com/wp-content/uploads/2016/08/How-to-Set-a-Default-Featured-Image-in-WordPress.png",

      user: {
        _id: currentUser?.id,
        username: currentUser?.username,
        img: "something.img",
      },
    });
  }, [title, value, category, file, currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();
    console.log(imgUrl);
    try {
      if (state) {
        await fetch(`http://localhost:5000/api/v1/posts/${state._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description: value,
            category,
            image: file
              ? toString(imgUrl) + ".jpg"
              : "https://soliloquywp.com/wp-content/uploads/2016/08/ How-to-Set-a-Default-Featured-Image-in-WordPress.png",
          }),
        });
      } else {
        await fetch("http://localhost:5000/api/v1/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description: value,
            category,
            image: file
              ? imgUrl.name
              : "https://soliloquywp.com/wp-content/uploads/2016/08/How-to-Set-a-Default-Featured-Image-in-WordPress.png",
            user: {
              _id: currentUser?.id,
              username: currentUser?.username,
              img: currentUser?.img || "something.img",
            },
          }),
        });
      }

      navigate("/");
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return (
    <div className="create">
      <div className="create-content">
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <div className="create-menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b> Visibility: </b> Public
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            name=""
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label htmlFor="file">Upload</label>
          <div className="buttons">
            <button>Save as Draft</button>
            <button onClick={handleSubmit}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <input
            type="radio"
            name="cat"
            value={"art"}
            id="art"
            onChange={(e) => setCategory(e.target.value)}
            checked={category === "art"}
          />
          <label htmlFor="art">Art</label>

          <input
            type="radio"
            name="cat"
            value={"tech"}
            id="tech"
            onChange={(e) => setCategory(e.target.value)}
            checked={category === "tech"}
          />
          <label htmlFor="tech">Tech</label>

          <input
            type="radio"
            name="cat"
            value={"design"}
            id="design"
            onChange={(e) => setCategory(e.target.value)}
            checked={category === "design"}
          />
          <label htmlFor="design">Design</label>

          <input
            type="radio"
            name="cat"
            value={"work"}
            id="work"
            onChange={(e) => setCategory(e.target.value)}
            checked={category === "work"}
          />
          <label htmlFor="work">Work</label>

          <input
            type="radio"
            name="cat"
            value={"health"}
            id="health"
            onChange={(e) => setCategory(e.target.value)}
            checked={category === "health"}
          />
          <label htmlFor="health">Health</label>

          <input
            type="radio"
            name="cat"
            value={"others"}
            id="others"
            onChange={(e) => setCategory(e.target.value)}
            checked={category === "other"}
          />
          <label htmlFor="others">Others </label>
        </div>
      </div>
    </div>
  );
};

export default Create;
