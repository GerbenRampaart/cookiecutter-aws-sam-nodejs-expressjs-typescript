import { Request, Response } from "express";
import { TransformAsync, jsonAsync  } from "express-mung";


const envelopeTransformer: TransformAsync = async (body: any, req: Request, res: Response) => {
  res.send("mung");
}

onError = async (err: any, req: Request, res: Response) => {
  res.send("mung");
}

export const envelope = jsonAsync(envelopeTransformer, { mungError: true });

export default envelope;