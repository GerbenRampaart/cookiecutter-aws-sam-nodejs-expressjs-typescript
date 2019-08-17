import { Request, Response, NextFunction} from "express";
import petsService from "../../../services/pets/service";
import { getPetByIdRequestParams } from "./getPetByIdRequestParams";
import NotFound from '../../../exceptions/notFound';

const getPetByIdOperation = async (req: Request, res: Response, next: NextFunction) => {
  const params: getPetByIdRequestParams = req.params;
  const existingPet = await petsService.byId(params.id);

  if (!existingPet) {
    next(new NotFound(params.id));
  }

  res.send(existingPet);
};

export default getPetByIdOperation;