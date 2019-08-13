import * as Joi from "@hapi/joi";
import { RequestHandler } from "express";

const requestParams = async (req: Request, res: Response, next: ) => {

  const schema = Joi.object().keys({
    id: Joi.string().required()
  });

}
  schema: Joi.ObjectSchema;

  constructor() {
    this
  }

  async validate(params: any): Promise<RequestParams> {
    return await Joi.validate<RequestParams>(
      params,
      this.schema,
      {
        abortEarly: false
      });
  }
}

export default new RequestParams;
