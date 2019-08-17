import { Router, Request, Response } from "express";
import petsService from "../../services/pets/service";
import getPetByIdOperation from "./getPetById/getPetByIdOperation";
import createPetValidator from './createPet/createPetValidator';
import createPetOperation from "./createPet/createPetOperation";
import getAllPetsOperation from "./getAllPets/getAllPetsOperation";
import getPetByIdValidator from "./getPetById/getPetByIdValidator";

class PetsController {
  public path = '/pets';
  public router = Router();

  constructor() {
  }

  public initializeRoutes() {
    this.router.get(this.path, getAllPetsOperation);
    this.router.get(`${this.path}/:id`, getPetByIdValidator, getPetByIdOperation);
    this.router.post(this.path, createPetValidator, createPetOperation);
    this.router.put(this.path, this.updatePet);
  }
}

export default PetsController;