import mongoose from "mongoose";

const imageDescriptionSchema = new mongoose.Schema({
    pageNo:{
        type:Number,
    },
    image:{
        type:String,
    },
    heading:{
        type:String,
    },
    description:{
        type:String,
    }
});

const ImageDescription = mongoose.model('imageDescription',imageDescriptionSchema);

export default ImageDescription;