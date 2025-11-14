

import mongoose from "mongoose";


export const connectDb = ()=>{

  try {

     mongoose.connect(process.env.MONGO_URL).then(()=> console.log("Database is connected "))

  } catch (error) {

    console.log(error);

  }
}
