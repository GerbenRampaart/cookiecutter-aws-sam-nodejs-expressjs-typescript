import { Router, Request, Response } from "express";
import petsService from "../../services/pets/service";
import getPetById from "./getPetById/operation";
import { resolveSoa } from "dns";

class PetsController {
  public path = '/pets';
  public router = Router();

  constructor() {

  }

  public initializeRoutes() {
    this.router.get(this.path, this.getAllPets);
    this.router.get(`${this.path}/:id`, getPetById);
    this.router.post(this.path, this.createPet);
    this.router.put(this.path, this.updatePet);
  }

  getAllPets = async (req: Request, res: Response) => {
    const all = await petsService.all();
    res.send(all);
  };




  createPet = async (req: Request, res: Response) => {
    const newPet = await petsService.create({
      name: req.body.name,
      type: req.body.type
    });

    res
      .status(201)
      .location(`/api/pets/${newPet.id}`)
      .json(newPet);
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