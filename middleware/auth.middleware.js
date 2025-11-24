


import jwt from "jsonwebtoken"
import { verifyAccessToken } from "../utils/token.js";


const authMiddleware = (req,res,next)=>{



  const authHeader = req.headers.authorization; // or req.headers["authorization"]

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No or invalid auth header" });
  }

  const token = authHeader.split(" ")[1]; // Extract token

  //console.log(token)



  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }

  try {
    const payload = verifyAccessToken(token);

  

    req.user = {
      id: payload.id,
      role: payload.role,
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }



}

export default authMiddleware;
