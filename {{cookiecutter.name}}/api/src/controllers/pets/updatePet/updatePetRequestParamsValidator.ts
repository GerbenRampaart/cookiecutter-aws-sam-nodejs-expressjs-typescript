import * as Joi from "@hapi/joi";
import schemaValidator from "../../../middleware/schemaValidator";

const schema = Joi.object().keys({
  id: Joi.string().required()
});

const updatePetRequestParamsValidator = schemaValidator(schema, "params");

export default updatePetRequestParamsValidator;