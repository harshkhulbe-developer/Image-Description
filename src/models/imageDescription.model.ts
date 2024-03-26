import mongoose from "mongoose";

const imageDescriptionSchema = new mongoose.Schema({
    image:{
        type:String,
    },
    heading:{
        type:String,
        
    },
    description:{
        type:String,
    }
})

const ImageDescription = mongoose.model('imageDescription',imageDescriptionSchema);

export default ImageDescription;