import { Request, Response } from "express";
import HttpException from "../exceptions/httpException";
import { NextFunction } from "connect";

// https://wanago.io/2018/12/17/typescript-express-error-handling-validation/
const errorMiddleware = (err: HttpException, req: Request, res: Response, next: NextFunction) => {
  res.locals.exception = err;
  res.status(err.status || 500).end();
};

export default errorMiddleware;
