import { Request, Response } from "express";
import { TransformAsync, jsonAsync  } from "express-mung";


const envelopeTransformer: TransformAsync = async (body: any, req: Request, res: Response) => {
  if (!body) {
    return;
  }

  if (!!body.isException) {
    res.send({
      metadata: body,
      data: {}
    });
  } else {
    res.send({
      metadata: {
      },
      data: body
    });
  }
}

export const envelope = jsonAsync(envelopeTransformer, { mungError: true });

export default envelope;