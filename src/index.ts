const express = require("express")
const bodyParser = require("body-parser")
import dotenv from "dotenv";
import dbConnect from "./db/db";
import imageDescriptionRouter from "./routes/imageDescription.route";
dotenv.config();

const app = express();

dbConnect();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(imageDescriptionRouter);
app.listen(process.env.PORT,() => {
    console.log(`Server listening at port ${process.env.PORT}`);
})

