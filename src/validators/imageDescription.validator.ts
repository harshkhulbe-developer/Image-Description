import * as Joi from "joi";

export class ImageDescriptionValidation{
    static async createImageDescription(req:any,res:any,next:any){
       const schema=Joi.object().keys({
        pageNo:Joi.number(),
        image:Joi.optional(),
        heading:Joi.string().required(),
        description:Joi.string().required().max(1500),
       })


       const isValid = await ImageDescriptionValidation.validate(req.body, res, schema);
        if (isValid) {
            next();
        }
    }

     static  async validate(body:any, res:any, schema:any) {
        try {
          const validation = await schema.validate(body, { abortEarly: true });
          if (validation.error) {
            const error = validation.error.details.map((e:any) => (e = e.message));
            res.status(422).json({
              status: 422,
              statusText: "VALIDATION_FAILED",
              message: "Validation Failed!",
              data: { error },
            });
            return false;
          } else {
            return true;
          }
        } catch (err) {
          console.log(err);
        }
      };
}