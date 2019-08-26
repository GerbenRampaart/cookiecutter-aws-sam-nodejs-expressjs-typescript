import {
  GraphQLList
} from 'graphql';

import { IGraphQLQuery } from '../IGraphQLQuery'
import PetsService from '../../../services/pets/petsService';
import { PetGraphQLType } from '../../types/pet/petType';
import { PetModel } from '../../types/pet/petModel';

export class AllPetsQuery implements IGraphQLQuery {

  public type = new GraphQLList(PetGraphQLType);
  public description: string;

  constructor() {
    this.description = "List of all pets";
  }

  public resolve = async (): Promise<PetModel[]> => {
      return await PetsService.all();
  }    

}