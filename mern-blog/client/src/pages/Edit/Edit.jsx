import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../Create/Create.css";

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [value, setValue] = useState("");
  const [category, setCategory] = useState("");
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/post/${id}`);
        const post = response.data;
        setTitle(post.title);
        setValue(post.description);
        setCategory(post.category);
        if (post.image) {
          setFile(post.image);
        }
        console.log(category)
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    getPost();

   
  }, [id]);
  useEffect(()=>{console.log(category)}, [category])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = new FormData();

    updatedData.append("id", id);
    updatedData.append("title", title);
    updatedData.append("description", value);
    updatedData.append("category", category);

    if (file) {
      updatedData.append("image", file);
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/v1/post/${id}`, updatedData, {
        withCredentials: true,
      });
      console.log(response.data);
      // Navigate back to the post page
      navigate(`/post/${id}`);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Update the file state with the selected file
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value); // Update the category state
  };

  return (
    <div className="edit-container">
      <form className="blog-form" onSubmit={handleSubmit}>
        <div className="create-text">
          <h2 className="write-as">Edit as {currentUser.name}</h2>
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
                  onChange={handleCategoryChange}
                />
                <label htmlFor={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</label>
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
            Update
          </button>
        </div>
        <div className="file-preview">
          {file ? (
            <span className="filename">Filename: {file.name}</span> // Display file name instead of splitting
          ) : (
            <span>No Picture Chosen</span>
          )}
        </div>
      </form>
    </div>
  );
};

export default Edit;
