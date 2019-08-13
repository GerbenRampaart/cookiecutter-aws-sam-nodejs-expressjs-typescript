import HttpException from "../../exceptions/httpException";

class NotFound extends HttpException {
  constructor(id: string) {
    super(404, `Pet with id ${id} not found`);
  }
}

export default NotFound;
