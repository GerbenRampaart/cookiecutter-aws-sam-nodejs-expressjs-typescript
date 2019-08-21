import { AllPetsQuery } from './queries/allPets.query';
//import { SavePetMutation, ISavePetMutationArguments } from './mutations/save.mutation';
import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { PetGraphQLType } from './types/pet.type';

// https://github.com/mateusconstanzo/express-graphql-typescript/

class Query {

  public name = "AllPets";
  public description = "Blog Application Schema Query Root";

  public fields = () => {
    return {
      pets: new AllPetsQuery()
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
    PetGraphQLType 
  ]
});