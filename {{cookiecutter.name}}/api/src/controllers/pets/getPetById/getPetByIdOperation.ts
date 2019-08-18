import { Request, Response, NextFunction} from "express";
import petsService from "../../../services/pets/petsService";
import { getPetByIdRequestParams } from "./getPetByIdRequestParams";
import NotFound from '../../../exceptions/notFound';
import { getPetByIdResponseMapper } from "./getPetByIdResponseMapper";

const getPetByIdOperation = async (req: Request, res: Response, next: NextFunction) => {
  const params: getPetByIdRequestParams = req.params;
  const existingPet = await petsService.byId(params.id);

  if (!existingPet) {
    return next(new NotFound(params.id));
  }

  const responseModel = getPetByIdResponseMapper(existingPet);

  res
    .status(200)
    .send(responseModel);
};

export default getPetByIdOperation;