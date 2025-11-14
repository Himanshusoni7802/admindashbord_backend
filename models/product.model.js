
import mongoose, { Schema } from "mongoose"

//name, price, category, description,

const productSchema = new Schema({
     name :{

       type:String,
       required:true

     },
     price:{
          type:Number,
          required:true
     },
     category:{

        type:String,
        required:true

     },
     description:{


      type:String,
      required:true 

     }

})


const Product = mongoose.model('Product',productSchema);

export default Product ;
