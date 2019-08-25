import {
  GraphQLList
} from 'graphql';

import { IGraphQLQuery } from '../IGraphQLQuery'
import { PetGraphQLType, IPet } from '../../types/petType';
import PetsService from '../../../services/pets/petsService';

export class AllPetsQuery implements IGraphQLQuery {

  public type = new GraphQLList(PetGraphQLType);
  public description: string;

  constructor() {
    this.description = "List of all pets";
  }

  public resolve = async (): Promise<IPet[]> => {
      return await PetsService.all();
  }    

}