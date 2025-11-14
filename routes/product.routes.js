



import express from "express";
import { AddProduct, deleteProduct, findAllProduct, updateProduct,productFilter } from "../controllers/product.controller.js";

const router = express.Router() ;



router.post('/createproduct',AddProduct);


router.get('/allproduct',findAllProduct);

router.post('/updateproduct/:id',updateProduct);


router.delete('/delete/:id',deleteProduct);


router.get('/findproduct/:category',productFilter)









export default router ;
