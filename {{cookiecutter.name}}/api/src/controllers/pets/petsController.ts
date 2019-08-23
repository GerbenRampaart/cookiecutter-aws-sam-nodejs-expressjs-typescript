import { Router} from "express";
import getPetByIdOperation from "./getPetById/getPetByIdOperation";
import createPetRequestBodyValidator from './createPet/createPetRequestBodyValidator';
import createPetOperation from "./createPet/createPetOperation";
import getAllPetsOperation from "./getAllPets/getAllPetsOperation";
import getPetByIdRequestParamsValidator from "./getPetById/getPetByIdRequestParamsValidator";
import updatePetRequestParamsValidator from "./updatePet/updatePetRequestParamsValidator";
import updatePetOperation from "./updatePet/updatePetOperation";
import updatePetRequestBodyValidator from "./updatePet/updatePetRequestBodyValidator";
import deletePetRequestParamsValidator from "./deletePet/deletePetRequestParamsValidator";
import deletePetOperation from "./deletePet/deletePetOperation";

class PetsController {
  // https://restfulapi.net/resource-naming/
  public collectionResourcePath = '/pets';
  public singletonResourcePath = `${this.collectionResourcePath}/:id`;

  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(this.collectionResourcePath, getAllPetsOperation);
    this.router.get(this.singletonResourcePath, getPetByIdRequestParamsValidator, getPetByIdOperation);
    this.router.post(this.collectionResourcePath, createPetRequestBodyValidator, createPetOperation);
    this.router.put(this.singletonResourcePath, updatePetRequestParamsValidator, updatePetRequestBodyValidator, updatePetOperation);
    this.router.delete(this.singletonResourcePath, deletePetRequestParamsValidator, deletePetOperation);
  }
}

export default PetsController;