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
import { petsSchema } from './graphQL/petsSchema';
import * as GraphQLHTTP from 'express-graphql';

class PetsController {
  // https://restfulapi.net/resource-naming/
  public collectionResourcePath = '/pets';
  public singletonResourcePath = `${this.collectionResourcePath}/:id`;
  public graphQLResourcePath = `${this.collectionResourcePath}/graphql`;

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
  
    this.router.use(this.graphQLResourcePath, GraphQLHTTP({
      schema: petsSchema,
      graphiql: true,
    }));
  }
}

export default PetsController;