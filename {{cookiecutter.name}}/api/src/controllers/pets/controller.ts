import { Router, Request, Response } from "express";
import petsService from "../../services/pets/service";
import getPetById from "./getPetById/getPetByIdOperation";
import createPetValidator from './createPet/createPetValidator';
import createPetOperation from "./createPet/createPetOperation";
import getAllPetsOperation from "./getAllPets/getAllPetsOperation";

class PetsController {
  public path = '/pets';
  public router = Router();

  constructor() {

  }

  public initializeRoutes() {
    this.router.get(this.path, getAllPetsOperation);
    this.router.get(`${this.path}/:id`, getPetById);
    this.router.post(this.path, createPetValidator, createPetOperation);
    this.router.put(this.path, this.updatePet);
  }







  updatePet = async (req: Request, res: Response) => {
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
}

export default PetsController;