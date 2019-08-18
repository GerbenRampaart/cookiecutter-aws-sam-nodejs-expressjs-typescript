import { Request, Response, NextFunction} from "express";
import petsService from "../../../services/pets/petsService";
import { deletePetRequestParams } from "./deletePetRequestParams";
import NotFound from '../../../exceptions/notFound';

const deletePetOperation = async (req: Request, res: Response, next: NextFunction) => {
  const params: deletePetRequestParams = req.params;
  const existingPet = await petsService.byId(params.id);

  if (!existingPet) {
    return next(new NotFound(params.id));
  }

  await petsService.delete(existingPet!.id);

  res.status(200).end();
};

export default deletePetOperation;
