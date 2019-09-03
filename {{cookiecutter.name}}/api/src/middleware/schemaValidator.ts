import { ObjectSchema, validate, ValidationOptions, ValidationError, ValidationErrorItem } from "@hapi/joi";
import { Request, Response, NextFunction } from "express";
import { BadRequest } from "../exceptions/badRequest";

export const schemaValidator = (schema: ObjectSchema, type: "params" | "body") => {

  const validationOptions: ValidationOptions = {
    abortEarly: false,
    allowUnknown: false
  }

  return async (req: Request, res: Response, next: NextFunction) => {

    const data = type === "body" ? req.body : req.params;

    if (!data) {
      next(new BadRequest(`Expected ${type} but nothing found`));
    }

    await validate(data, schema, validationOptions, (err: ValidationError, value: any) => {
      if (err) {
        const messages: string[] = [];

        err.details.forEach((errItem: ValidationErrorItem) => {
          messages.push(errItem.message.replace(/\\/g, "'"));
        });

        return next(new BadRequest(messages));
      }

      return next();
    });
  }
}
