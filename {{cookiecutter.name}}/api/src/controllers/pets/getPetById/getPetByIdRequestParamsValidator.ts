import * as Joi from "@hapi/joi";
import schemaValidator from "../../../middleware/schemaValidator";

const schema = Joi.object().keys({
  id: Joi.string().required()
});

const getPetByIdRequestParamsValidator = schemaValidator(schema, "params");

export default getPetByIdRequestParamsValidator;