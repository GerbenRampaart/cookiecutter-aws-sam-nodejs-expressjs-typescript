import * as Joi from "@hapi/joi";
import { schemaValidator } from "../../../middleware/schemaValidator";
import { PetType } from "../../../services/pets/petEntity";

const schema = Joi.object().keys({
  name: Joi.string().required(),
  type: Joi.string().valid(Object.keys(PetType)).required()
});

export const createPetRequestBodyValidator = schemaValidator(schema, "body");
