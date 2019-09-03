import { HttpException } from "./httpException";

export class BadRequest extends HttpException {
  constructor(message: any) {
    super(400, message);
  }
}
