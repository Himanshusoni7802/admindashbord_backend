
import User from "../models/user.model.js";

import bcrypt from "bcryptjs";
import express from "express";

import jwt from "jsonwebtoken";





export const Register = async (req, res) => {

  try {

    const { name, email, password, role } = req.body;

    const user = await User.create({
      name,
      email,
      password,
      role
    })

    const hashedpassword = await bcrypt.hash(password, 10);

    user.password = hashedpassword;


    await user.save();


    res.status(200).json(user);



  } catch (error) {

    console.log(error)
  }
}



// export const Login = async(req,res)=>{

//   try {

//        const {email,password} = req.body ;

//        const findEmail = await User.findOne(email);



//        if(!email){

//         return res.status(404).json({message:"email is not found please register first "});

//        }

//        if(findEmail.password != password){

//             return res.status(404).json({message:"password is not matched "});


//        }



//        res.status(200).json({
//           message:"user loged in successfully"
//        })




//   } catch (error) {

//     console.log(error)
//   }

// }



//-------------------------------api written by me -----------------------


// export const Login = async (req, res) => {
//   try {
//     const { email, password,role } = req.body;

//     //console.log(email);



//     if (!email || !password) {
//       return res.status(400).json({ message: "Email and password are required." });
//     }


//     const findEmail = await User.findOne({ email });

//     //console.log(findEmail);




//     if (!findEmail) {
//       return res.status(404).json({ message: "Email not found, please register first." });
//     }



//     const matchedPassword = await bcryptjs.compare(password, findEmail.password);

//     if (!matchedPassword) {

//       return res.status(500).json({ message: "Password does not match " });


//     }



//        const token = jwt.sign({ userId:findEmail._id,role:findEmail.role},process.env.JWT_SECRET,{expiresIn:"1d"});





//         const role = findEmail.role ;



//       res.cookie("token",token,{
//                httponly:true,
//                secure:true,
//                maxAge:24*60*60*1000
//       })




//     res.status(200).json({
//       message: "User logged in successfully",

//       token,
//       role
//     });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };



export const Login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ message: "Email, password & role are required." });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Email not found, please register first." });
    }

    // Role check
    if (user.role !== role) {
      return res.status(400).json({ message: "Role does not match our records." });
    }

    // Password check
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password." });
    }

    // Create JWT Token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,      // change to false during localhost
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000
    });

    res.status(200).json({
      message: "Login successful",
      token,
      role: user.role,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.log("Login Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};







export const getAllUser = async(req,res)=>{

  try {

      const users = await User.find({}) ;

       if(!users){

            return res.status(404).json({message:"internal server error "});


       }

       return res.status(200).json(users);


  } catch (error) {

       console.log(error);

  }

}









export const Updateuser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    console.log("🟢 Backend hit /update:", id, data);

    const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }


    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(" Update Error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};






export const deleteUser = async(req,res)=>{

      try {

           const {id} = req.params ;

           console.log(id);


           const deletedUser = await User.findByIdAndDelete(id);

           if (!deletedUser) {
             return res.status(404).json({ message: "User not found" });
           }

           res.json({ message: "User deleted successfully", deletedUser });




      } catch (error) {
             console.log(error)
      }
}