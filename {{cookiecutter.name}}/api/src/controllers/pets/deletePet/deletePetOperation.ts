import { Request, Response, NextFunction} from "express";
import { PetsService } from '../../../services/pets/petsService';
import { deletePetRequestParams } from "./deletePetRequestParams";
import { NotFound } from '../../../exceptions/notFound';

export const deletePetOperation = async (req: Request, res: Response, next: NextFunction) => {
  const params: deletePetRequestParams = req.params;
  const petsService = new PetsService();
  const existingPet = await petsService.byId(params.id);

  if (!existingPet) {
    return next(new NotFound(params.id));
  }

  await petsService.delete(existingPet!.id);

  res.status(200).end();
};
