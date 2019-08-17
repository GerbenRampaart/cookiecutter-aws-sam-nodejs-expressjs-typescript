import { Request, Response, NextFunction} from "express";
import petsService from "../../../services/pets/service";

const updatePetOperation = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const newPet = await petsService.update(id, {
    name: req.body.name,
    type: req.body.type
  });

  if (!newPet) {
    res.status(404).end(`${id} not found`);
    return;
  }

  res
    .status(201)
    .location(`/api/pets/${newPet.id}`)
    .json(newPet);
}

export default updatePetOperation;