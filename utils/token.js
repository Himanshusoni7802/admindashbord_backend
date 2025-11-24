

import jwt from "jsonwebtoken";

import dotenv from "dotenv";

dotenv.config();


export const  createAccessToken = (token)=>{

  return jwt.sign(token,process.env.ACCESS_SECRET,{expiresIn:"15m"})
}

export const  createRefreshToken = (payload)=>{

  return jwt.sign(payload,process.env.REFERSH_SECRET ,{expiresIn:"7d"})
}


export const verifyAccessToken = (payload)=>{

    return jwt.verify(payload,process.env.ACCESS_SECRET);

}

export const verifyRefreshToken = (token)=>{

  return jwt.verify(token,process.env.REFERSH_SECRET);

}