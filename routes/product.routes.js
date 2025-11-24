



import express from "express";
import { AddProduct, deleteProduct, findAllProduct, updateProduct,productFilter } from "../controllers/product.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router() ;



router.post('/createproduct',authMiddleware,  AddProduct);


router.get('/allproduct',authMiddleware,findAllProduct);

router.post('/updateproduct/:id',authMiddleware,updateProduct);


router.delete('/delete/:id',authMiddleware,deleteProduct);


//router.get('/findproduct/:category',productFilter)









export default router ;
