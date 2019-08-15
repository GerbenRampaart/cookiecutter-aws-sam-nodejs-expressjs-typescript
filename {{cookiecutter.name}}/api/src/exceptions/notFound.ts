import HttpException from "./httpException";

class NotFound extends HttpException {
  constructor(message: any) {
    super(404, message);
  }
}

export default NotFound;
