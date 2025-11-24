import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  Login,
  Register,
  Updateuser,

  getAllUser,
  logout,
} from "../controllers/user.controller.js";
import { requireRole } from "../middleware/role.middleware.js";


const router = express.Router();

router.post("/register", Register);

router.post("/login", Login);

router.get("/getusers",authMiddleware, requireRole("admin"), getAllUser);

router.patch("/updateuser/:id", Updateuser);

//router.delete("/deleteuser", deleteUser);


router.delete('/logout',logout);


export default router;
