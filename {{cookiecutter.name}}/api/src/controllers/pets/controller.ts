import { Router} from "express";
import getPetByIdOperation from "./getPetById/getPetByIdOperation";
import createPetValidator from './createPet/createPetRequestBodyValidator';
import createPetOperation from "./createPet/createPetOperation";
import getAllPetsOperation from "./getAllPets/getAllPetsOperation";
import getPetByIdValidator from "./getPetById/getPetByIdRequestParamsValidator";
import updatePetOperation from "./updatePet/updatePetOperation";
import updatePetValidator from "./updatePet/updatePetValidator";

class PetsController {
  // https://restfulapi.net/resource-naming/
  public collectionResourcePath = '/pets';
  public singletonResourcePath = `${this.collectionResourcePath}/:id`;
  
  public router = Router();

  constructor() {
  }

  public initializeRoutes() {
    this.router.get(this.collectionResourcePath, getAllPetsOperation);
    this.router.get(this.singletonResourcePath, getPetByIdValidator, getPetByIdOperation);
    this.router.post(this.collectionResourcePath, createPetValidator, createPetOperation);
    this.router.put(this.singletonResourcePath, updatePetValidator, updatePetOperation);
  }
}

export default PetsController;