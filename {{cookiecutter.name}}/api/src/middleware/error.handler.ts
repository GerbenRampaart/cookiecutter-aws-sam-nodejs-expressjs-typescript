import { Request, Response } from "express";

// https://wanago.io/2018/12/17/typescript-express-error-handling-validation/
const errorHandler = (
  err: any,
  req: Request,
  res: Response
) => {
  const errors = err.errors || [{ message: err.message }];
  res.status(err.status || 500).json({ errors });
};

export default errorHandler;
