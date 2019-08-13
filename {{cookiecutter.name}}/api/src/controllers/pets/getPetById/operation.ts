import { Request, Response, NextFunction} from "express";
import petsService from "../../../services/pets/service";
import PetNotFoundException from "../notFound";

const getPetById = async (req: Request, res: Response, next: NextFunction) => {
  const params = req.params// as GetById;

  if (!params) {
    res.status(400).end("id undefined");
    return;
  }

  const existingPet = await petsService.byId(params.petId);

  if (!existingPet) {
    next(new PetNotFoundException());
  }

  res.send(existingPet);
};

export default getPetById;