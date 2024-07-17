import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

// Get a specific user by ID
export const getUser = async (req, res) => {
  const { id } = req.params; // Extract user ID from request params

  try {
    const user = await User.findById(id); // Find user by ID in MongoDB

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user); // Return the user object if found
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a user

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, name, newPassword, profilePicture, currentPassword } = req.body;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify current password
    const isMatch = await bcryptjs.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Hash the newPassword if provided
    let hashedPassword = user.password; // Default to current password if no new password provided
    if (newPassword) {
      hashedPassword = await bcryptjs.hash(newPassword, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        username,
        name,
        password: hashedPassword,
        profilePicture,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Delete a user
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare provided password with hashed password
    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
