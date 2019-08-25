import { AllPetsQuery } from './queries/pets/allPetQuery';
//import { SavePetMutation, ISavePetMutationArguments } from './mutations/save.mutation';
import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { PetGraphQLType } from './types/petType';
import { OwnerGraphQLType } from "./types/ownerType";
import { AllOwnersQuery } from './queries/owners/allOwnersQuery';

// https://github.com/mateusconstanzo/express-graphql-typescript/

class Query {

  public name = "PetsAndOwners";
  public description = "The pet registration system";

  public fields = () => {
    return {
      pets: new AllPetsQuery(),
      owners: new AllOwnersQuery()
    }
  }
}
/*
class Mutation {

  public name = "mutation";
  public description = "";

  public fields = () => {
    return {
      savePet: new SavePetMutation()
    }
  }
}
*/
export const petsSchema = new GraphQLSchema({
  query: new GraphQLObjectType(new Query()),
  //mutation: new GraphQLObjectType(new Mutation()),
  types: [ 
    PetGraphQLType,
    OwnerGraphQLType
  ]
});