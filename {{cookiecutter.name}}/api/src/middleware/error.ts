import { Request, Response,  } from "express";
import HttpException from "../exceptions/httpException";

// https://wanago.io/2018/12/17/typescript-express-error-handling-validation/
const errorMiddleware = (err: HttpException, req: Request, res: Response) => {
  res.status(err.status || 500).send(
    {
      status: err.status,
      message: err.message 
    });
};

export default errorMiddleware;
