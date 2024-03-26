import ImageDescription from "../models/imageDescription.model";

export class ImageDescriptionController {
    static async createImageDescription(req: any, res: any) {

        try {
            const { heading, description } = req.body;
            const imageDescription = await ImageDescription.findOne({heading,description});
            if (imageDescription) {
                return res.status(400).json({
                    message: "ImageDescription is already created",
                })
            }
            const imageUrl = req.file ? req.file.originalname : null;
            const newImageDescription = new ImageDescription({
                image:imageUrl,
                heading,
                description,
            });

            await newImageDescription.save();
            res.status(201).json({
                message: "Image,heading and description saved successfully",
                newImageDescription,
            })
        } catch (error) {
            res.json({
                message: "Error while uploading the image",
                error,
            })
        }

    }


    static async getAllImageDescription(req:any,res:any) {
        try {
            const allImageDescriptions = await ImageDescription.find();

            if(!allImageDescriptions) {
                return res.status(404).json({
                    message:"No Image Descriptions found",
                })
            }
            return res.status(200).json({
                message:"Image Descriptions found successfully...",
                allImageDescriptions,
            })
        } catch (error) {
            console.log(error);
        }
    }

    static async getImageDescription(req: any, res: any) {
        try {
            const imageDescriptionId = req.params.id;
            const imageDescription = await ImageDescription.findOne({ _id: imageDescriptionId });

            if (!imageDescription) {
                return res.status(404).json({
                    message: "Image Description doesn't found",
                })
            }

            return res.status(200).json({
                message: "Image Description found successfully",
                imageDescription,
            })

        } catch (error) {
            console.log(error);
        }
    }
}