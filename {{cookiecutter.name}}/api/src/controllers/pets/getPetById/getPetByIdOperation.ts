import { Request, Response, NextFunction} from "express";
import petsService from "../../../services/pets/service";
import requestParamsParser from "./requestParamsParser";
import NotFound from '../../../exceptions/notFound';

const getPetByIdOperation = async (req: Request, res: Response, next: NextFunction) => {
  const params = await requestParamsParser(req.params);

  if (!params) {
    res.status(400).end("id undefined");
    return;
  }

  const existingPet = await petsService.byId(params.id);

  if (!existingPet) {
    next(new NotFound(params.id));
  }

  res.send(existingPet);
};

export default getPetByIdOperation;