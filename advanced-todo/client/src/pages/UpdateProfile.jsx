import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../features/auth/authSlice";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../../firebaseConfig.js";
import "../assets/stylesheets/UpdateProfile.css";

const UpdateProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const storage = getStorage(app);

  const [formData, setFormData] = useState({
    id: user._id,
    username: user.username,
    name: user.name,
    profilePicture: user.profilePicture || "",
    currentPassword: "", // Current password is required for updates
  });

  const { username, name, profilePicture, currentPassword } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const image = e.target.files[0];
    const filename = `${Date.now()}_${image.name}`;
    const storageRef = ref(storage, filename);

    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(Math.round(progress));
      },
      (error) => {
        console.log(error);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setFormData((prev) => ({ ...prev, profilePicture: downloadURL }));
        } catch (error) {
          console.error("Error uploading profile picture: ", error);
        }
      }
    );
  };

  const handleSubmitProfile = (e) => {
    e.preventDefault();
    dispatch(updateUser(formData));
    console.log(formData);
  };

  return (
    <div className="update-profile-container">
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmitProfile} className="update-profile-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="profilePicture">Profile Picture</label>
          <input
            type="file"
            id="profilePicture"
            ref={fileRef}
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>
        <div className="form-group">
          <label htmlFor="currentPassword">Current Password</label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            value={currentPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="update-profile-button">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
