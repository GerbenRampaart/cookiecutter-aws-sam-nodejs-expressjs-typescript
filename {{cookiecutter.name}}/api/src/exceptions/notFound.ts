import { HttpException } from "./httpException";

export class NotFound extends HttpException {
  constructor(message: any) {
    super(404, message);
  }
}
