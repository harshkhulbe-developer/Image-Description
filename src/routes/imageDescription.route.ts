const express = require("express");
const multer = require("multer");
import { ImageDescriptionController } from "../controllers/imageDescription.controller";
import { ImageDescriptionValidation } from "../validators/imageDescription.validator";
const imageDescriptionRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({storage});

//Create image with it's description
imageDescriptionRouter.post("/create-image-description",
upload.single("image"),
ImageDescriptionValidation.createImageDescription,
ImageDescriptionController.createImageDescription);
//Get all images with descriptions
imageDescriptionRouter.get("/",ImageDescriptionController.getAllImageDescription);
//Get a image with description
imageDescriptionRouter.get("/imageDescription/:id",ImageDescriptionController.getImageDescription);

export default imageDescriptionRouter;
