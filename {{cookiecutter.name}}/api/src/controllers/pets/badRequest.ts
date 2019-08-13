import HttpException from "../../exceptions/httpException";

class BadRequest extends HttpException {
  constructor(id: string) {
    super(404, `Pet with id ${id} not found`);
  }
}

export default BadRequest;
