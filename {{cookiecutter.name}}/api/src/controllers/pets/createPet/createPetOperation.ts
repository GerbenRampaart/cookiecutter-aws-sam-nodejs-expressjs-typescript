import { Request, Response, NextFunction} from "express";
import { PetsService } from '../../../services/pets/petsService';
import { v1 } from "uuid";
import { createPetRequestBody } from "./createPetRequestBody";
import { PetType } from "../../../services/pets/petEntity";

export const createPetOperation = async (req: Request, res: Response, next: NextFunction) => {
  const newId = v1();
  const body = req.body as createPetRequestBody;

  const petsService = new PetsService();
  const newPet = await petsService.create({
    id: newId,
    name: body.name,
    // https://blog.oio.de/2014/02/28/typescript-accessing-enum-values-via-a-string/
    petType: (<any>PetType)[body.type]
  });

  res
    .status(201)
    .location(`/api/pets/${newPet.id}`) // TODO: configure path
    .end()
}
