import { IGraphQLQuery } from "../IGraphQLQuery";
import { PetGraphQLType } from "../../types/petType";
import PetsService from "../../../services/pets/petsService";

export interface getPeyByIdArguments {
  id: string;
}

export class getPetById implements IGraphQLQuery {
  public type = PetGraphQLType;
  public description: string;

  constructor() {
    this.description = "Pet by id";
  }

  public resolve = async (root: any, args: getPeyByIdArguments) => {
    console.log(root);
    console.log(args);
      return await PetsService.byId(args.id);
  }    
}