import * as Joi from "@hapi/joi";
import schemaValidator from "../../../middleware/schemaValidator";
import { PetType } from "../../../services/pets/petEntity";

const schema = Joi.object().keys({
  name: Joi.string().required(),
  type: Joi.string().valid(Object.values(PetType)).required()
});

const createPetValidator = schemaValidator(schema, "body");

export default createPetValidator;