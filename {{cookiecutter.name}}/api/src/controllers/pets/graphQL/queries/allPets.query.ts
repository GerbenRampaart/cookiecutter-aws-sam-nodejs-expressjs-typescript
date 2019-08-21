import {
  GraphQLList
} from 'graphql';

import { GraphQLQuery } from './abstract.query'
import { PetGraphQLType } from '../types/pet.type';
import PetsService from '../../../../services/pets/petsService';

export class AllPetsQuery implements GraphQLQuery {

  public type = new GraphQLList(PetGraphQLType);
  public description: string;

  constructor() {
    this.description = "List of all Authors";
  }

  public resolve = async () => {
      return await PetsService.all();
  }    

}