import express from "express";
import { Login, Register, Updateuser, deleteUser, getAllUser } from "../controllers/user.controller.js";


const router = express.Router() ;


router.post('/register',Register);


router.post('/login',Login);


router.get('/getusers',getAllUser);

router.put('/updateuser/:id',Updateuser);


router.delete('/deleteuser/:id',deleteUser);











export default router ;
