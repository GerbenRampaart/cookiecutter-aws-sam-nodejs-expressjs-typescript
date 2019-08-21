import { Request, Response } from "express";
import { Transform, json } from "express-mung";
import HttpException from '../exceptions/httpException';

export interface IMetadata {
  http: {
    code: number,
    message: string
  },
  encoding: string,
  isException: boolean,
  exception?: {
    name: string,
    stack?: string | undefined
  }
}

const envelopeTransformer: Transform = (body: any, req: Request, res: Response) => {
  const metadataObj: IMetadata = {
    http: {
      code: res.statusCode,
      message: res.statusMessage
    },
    encoding: res.charset,
    isException: false
  }

  if (res.locals && res.locals.exception) {
    const exc: HttpException = res.locals.exception;

    if (exc) {
      metadataObj.isException = true;
      metadataObj.exception = {
        name: exc.name,
        stack: exc.stack
      };

      body = null;
    }
  }
console.log(body);
  res.send({
    metadata: metadataObj,
    data: body
  }).end();
}

export const envelope = json(envelopeTransformer, { mungError: true });

export default envelope;