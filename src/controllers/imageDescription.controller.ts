import ImageDescription from "../models/imageDescription.model";

export class ImageDescriptionController {
    static async createImageDescription(req: any, res: any) {

        try {
            const { pageNo, heading, description } = req.body;

            const imageUrl = req.file ? req.file.path : "";

            if (description.length + heading.length > 1500) {
                return res.status(400).json({
                    message: "Character count exceeds 1500 for the new description"
                });
            }

            const existingImageDescriptions = await ImageDescription.find({pageNo});
            let existingImageDescriptionsCount = existingImageDescriptions.length;

            existingImageDescriptions.forEach(existingImageDescription => {
                if (existingImageDescription && existingImageDescription.description && existingImageDescription.heading
                    && existingImageDescription.description.length + existingImageDescription.heading.length >= 500 
                    && existingImageDescription.description.length + existingImageDescription.heading.length  <= 1500) {

                    existingImageDescriptionsCount++; 
                }
            });

            if (description.length + heading.length >= 500) {
                if (existingImageDescriptionsCount >= 3) {
                    return res.status(400).json({
                        message: "Cannot add more than 3 entries to the page because you are adding the entry greater than or equal to 500 characters"
                    });
                }
            } else {
                if (existingImageDescriptionsCount >= 4) {
                    return res.status(400).json({
                        message: "Cannot add more than 4 entries to the page because maximum 4 entries allowed",
                    });
                }
            }
            
            const newImageDescription = new ImageDescription({
                pageNo,
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
            const {pageNumber} = req.params;

            const allImageDescriptions = await ImageDescription.aggregate([
                { $match: { pageNo: Number(pageNumber) } }
            ]);

            if(allImageDescriptions.length <= 0) {
                return res.status(404).json({
                    message:"No Image Descriptions found for this page",
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