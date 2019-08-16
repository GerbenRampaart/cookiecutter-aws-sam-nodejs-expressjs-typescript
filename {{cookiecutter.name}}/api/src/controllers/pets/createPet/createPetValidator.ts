import * as Joi from "@hapi/joi";
import schemaValidator from "../../../middleware/schemaValidator";
import { PetType } from "../../../services/pets/entity";

const schema = Joi.object().keys({
  name: Joi.string().required(),
  type: Joi.string().valid(PetType.CAT, PetType.DOG).required()
});

const createPetValidator = schemaValidator(schema, "body");

export default createPetValidator;