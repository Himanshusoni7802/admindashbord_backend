




import express from 'express';

import dotenv from "dotenv";

import cors from "cors";


import { connectDb } from './db/db.js';

import userRouter from "./routes/user.routes.js"

import productRouter from "./routes/product.routes.js";
import cookieParser from "cookie-parser";



import bodyParser from 'body-parser';

dotenv.config();


const app = express();

app.use(express.json());

app.use(cookieParser());



app.use(
     cors({
       origin: "http://localhost:5173",   // your frontend URL
       credentials: true,
       methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
     })
   );


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));




connectDb();

app.use('/api/user',userRouter)


app.use('/api/product',productRouter);




app.get('/',(req,res)=>{

     res.send("Hello from node js api");

})


app.listen(process.env.PORT , ()=>{

       console.log(`server is running at port no ${process.env.PORT}`);

})