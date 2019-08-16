import * as Joi from "@hapi/joi";
import { IRequestParams } from "./requestParams";

const requestParamsParser = async (params: any) => {

  const schema = Joi.object().keys({
    id: Joi.string().required()
  });

  return await Joi.validate<IRequestParams>(
    params,
    schema,
    {
      abortEarly: false
    });
}

export default requestParamsParser;