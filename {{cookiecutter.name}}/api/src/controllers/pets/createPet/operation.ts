import { Request, Response, NextFunction} from "express";
import petsService from "../../../services/pets/service";
import { v1 } from "uuid";

const createPet = async (req: Request, res: Response, next: NextFunction) => {
  const requestBody = await requestBodyParser(req.body);
  const newId = v1();

  const newPet = await petsService.create({
    id: newId,
    name: requestBody.name,
    type: requestBody.type
  });

  res
    .status(201)
    .location(`/api/pets/${newPet.id}`)
    .send(newPet);
}

export default createPet;