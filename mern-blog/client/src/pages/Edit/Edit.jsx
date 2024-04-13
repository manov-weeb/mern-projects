import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";

const Edit = () => {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [value, setValue] = useState("");
  const [category, setCategory] = useState("");
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const getPost = async () => {
      const response = await axios.get(
        `http://localhost:5000/api/v1/post/${id}`
      );
      console.log(response.data.user._id);
      const post = response.data;
      setTitle(post.title);
      setValue(post.description);
      setCategory(post.category);
    };

    getPost();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = new FormData();

    updatedData.set("id", id);
    updatedData.set("title", title);
    updatedData.set("description", value);
    updatedData.set("category", category);

    if (file?.[0]) {
      updatedData.set("image", file?.[0]);
    }

    const response = await axios.put(
      `http://localhost:5000/api/v1/post/${id}`,
      updatedData,
      {
        withCredentials: true,
      }
    );
    console.log(response.data);
  };
  return (
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
          Update
        </button>
      </div>
    </form>
  );
};

export default Edit;
