import { ObjectSchema, validate, ValidationOptions, ValidationError  } from "@hapi/joi";
import { Request, Response, NextFunction } from "express";
import BadRequest from "../exceptions/badRequest";

const schemaValidator = (schema: ObjectSchema, type: "params" | "body") => {

  const validationOptions: ValidationOptions = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true
  }

  return async (req: Request, res: Response, next: NextFunction) => {

    const data = type === "body" ? req.body : req.params;

    if (!data) {
      next(new BadRequest(`Expected ${type} but nothing found`));
    }

    await validate(data, schema, validationOptions, (err: ValidationError, value: any) => {
      if (err) {
        // err.details.forEach((errItem: ValidationErrorItem) => {
        // });
        next(new BadRequest(err));
      } else {
        req.body = value;
        next();
      }
    });
  }
}

export default schemaValidator;
