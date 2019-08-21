import { Request, Response } from "express";
import HttpException from "../exceptions/httpException";
import { NextFunction } from "connect";

// https://wanago.io/2018/12/17/typescript-express-error-handling-validation/
const errorHandler = (err: HttpException, req: Request, res: Response, next: NextFunction) => {

  // https://expressjs.com/en/guide/error-handling.html
  if (res.headersSent) {
    return next(err);
  }

  res.locals.exception = err;
  //res.status(err.status || 500);
  return next();
};

export default errorHandler;
