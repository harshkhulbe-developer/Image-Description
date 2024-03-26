import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const MONGO_URL: any = process.env.MONGO_URL;
function dbConnect() {
    mongoose.connect(MONGO_URL).then(() => {
        console.log(`Database connected successfully`)
    }).catch((err) => {
        console.log(err,"...err");
    })
}

export default dbConnect;