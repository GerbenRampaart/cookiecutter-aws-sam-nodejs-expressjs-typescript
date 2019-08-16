import HttpException from "./httpException";

class BadRequest extends HttpException {
  constructor(message: any) {
    super(400, message);
  }
}

export default BadRequest;
