import User from "../models/user.model.js";

import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

import { createAccessToken, createRefreshToken } from "../utils/token.js";

export const Register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const user = await User.create({
      name,
      email,
      password,
      role,
    });

    const hashedpassword = await bcrypt.hash(password, 10);

    user.password = hashedpassword;



    await user.save();

    // res.cookie("token", token, {
    //   httpOnly: true,
    //   secure: false,
    //   sameSite: "lax",
    //   maxAge: 24 * 60 * 60 * 1000,
    // });





      await  user.save();






    res.status(200).json({user});


  } catch (error) {
    console.log(error);
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res
        .status(400)
        .json({ message: "Email, password  are required." });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "Email not found, please register first." });
    }

    // Role check
    if (user.role !== role) {
      return res
        .status(400)
        .json({ message: "Role does not match our records." });
    }

    // Password check
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password." });
    }

    // Create JWT Token

    const refreshtoken = createRefreshToken({userId:user._id, role:user.role})

    
    const accesstoken = createAccessToken({userId :user._id ,role:user.role})





    // Set cookie
    res.cookie("token", refreshtoken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login successful",

      role: user.role,
      token:accesstoken,

      user: {
        _id: user._id,
        name: user.name,
        email: user.email,

      },
    });
  } catch (error) {
    console.log("Login Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const users = await User.find({ role: "user" });

    if (!users) {
      return res.status(404).json({ message: "internal server error " });
    }

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};

export const Updateuser = async (req, res) => {
  try {
    const { id } = req.params;

    const data = req.body;

    const updatedUser = await User.findOneAndUpdate({ _id: id }, data, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.deleteMany();

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully", deletedUser });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });

    return res.json({ message: "user logged out successfully" });
  } catch (error) {
    console.log(error);
  }
};
