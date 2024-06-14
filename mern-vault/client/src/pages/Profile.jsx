import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserSuccess,
  deleteUserStart,
  signout,
} from "../redux/user/userSlice";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app, auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const Profile = () => {
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [image, setImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is authenticated:", user);
      } else {
        console.error("User is not authenticated");
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = (image) => {
    const storage = getStorage(app);
    const filename = `${Date.now()}_${image.name}`;
    const storageRef = ref(storage, filename);
    const uploadTask = uploadBytesResumable(storageRef, image);

    setUploadError(null); // Clear previous errors

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(Math.round(progress));
      },
      (error) => {
        setUploadError(`Upload error: ${error.message}`);
        setUploadProgress(0);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setFormData((prev) => ({ ...prev, profilePicture: downloadURL }));
          setUploadProgress(100);
          console.log(formData);
        } catch (error) {
          setUploadError("Failed to get download URL");
          setUploadProgress(0);
        }
      }
    );
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    console.log(formData);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/v1/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data));
      } else {
        dispatch(updateUserSuccess(data));
        console.log("User updated successfully:", data);
        setUpdateSuccess(true);
      }
    } catch (error) {
      dispatch(updateUserFailure(error.message));
      console.error("Error updating user:", error);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/v1/user/delete/${currentUser._id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        console.log(res);
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data));
        console.log(data);
      } else {
        dispatch(deleteUserSuccess());
      }
    } catch (error) {
      console.log(error);
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignout = async (e) => {
    try {
      await fetch("/api/v1/auth/signout");
      dispatch(signout());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-5 max-w-lg mx-auto bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-3xl font-semibold text-center my-7 text-gray-800">
        Profile
      </h1>
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
        <input
          type="file"
          ref={fileRef}
          onChange={(e) => setImage(e.target.files[0])}
          className="hidden"
          accept="image/*"
        />
        <div className="relative group self-center">
          <img
            onClick={() => fileRef.current.click()}
            id="profile-pic"
            className="h-28 w-28 cursor-pointer rounded-full object-cover border-2 border-gray-300 transition duration-150 ease-in-out transform group-hover:scale-105"
            src={formData.profilePicture || currentUser.profilePicture}
            alt={currentUser.username}
          />
          <div className="absolute bottom-[-10%] w-40 left-1/2 transform -translate-x-1/2 translate-y-full bg-gray-700 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition duration-150 ease-in-out pointer-events-none">
            Click to change the picture
          </div>
        </div>
        <p className="text-sm self-center mt-2">
          {uploadError ? (
            <span className="text-red-700">
              {"Failed to upload image (File size must be less than 5MB)"}
            </span>
          ) : uploadProgress > 0 && uploadProgress < 100 ? (
            <span className="text-slate-700">{`Uploading: ${uploadProgress}%`}</span>
          ) : uploadProgress === 100 ? (
            <span className="text-green-700">Image uploaded successfully</span>
          ) : null}
        </p>
        <input
          defaultValue={currentUser.username}
          type="text"
          id="username"
          placeholder="Username"
          className="bg-slate-100 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
          onChange={handleInputChange}
        />
        <input
          defaultValue={currentUser.email}
          type="email"
          id="email"
          placeholder="Email"
          className="bg-slate-100 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
          onChange={handleInputChange}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="bg-slate-100 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
          onChange={handleInputChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:bg-slate-600 disabled:opacity-80 transition duration-150 ease-in-out"
          type="submit"
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </form>
      <div className="flex justify-between mt-3">
        <span
          className="text-red-700 cursor-pointer hover:text-red-600 transition duration-150"
          onClick={handleDelete}
        >
          Delete Account
        </span>
        <span
          className="text-red-700 cursor-pointer hover:text-red-600 transition duration-150"
          onClick={handleSignout}
        >
          Sign Out
        </span>
      </div>
      <p className="text-green-800 mt-3 text-center">
        {updateSuccess && "Updated Successfully!"}
      </p>
      <p className="text-red-800 mt-3 text-center">
        {error && "Something went wrong."}
      </p>
    </div>
  );
};

export default Profile;
