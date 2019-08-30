import { IGraphQLQuery } from "../IGraphQLQuery";
import { PetGraphQLType } from '../../types/pet/petType';
import { PetModel } from "../../types/pet/petModel";

export interface getPeyByIdArguments {
  id: string;
}

export class getPetById implements IGraphQLQuery {
  public type = PetGraphQLType;
  public description: string;

  constructor() {
    this.description = "Pet by id";
  }

  public resolve = async (root: any, args: getPeyByIdArguments): Promise<PetModel | undefined> => {
    console.log(root);
    console.log(args);
    //return null;
    return Promise.resolve(undefined);
      //return await PetsService.byId(args.id);
  }    
}