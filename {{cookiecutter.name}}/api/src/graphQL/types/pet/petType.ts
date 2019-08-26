import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from "graphql";
import { PetModel } from "./petModel";

const petFields = {
  id: {
    type: new GraphQLNonNull(GraphQLString)
  },
  fullName: {
    type: GraphQLString,
    resolve: (pet: PetModel) => {
      return `A ${pet.petType} named ${pet.name}`;
    }
  },
  name: {
    type: GraphQLString
  },
  petType: {
    type: GraphQLString
  }
};

class Pet {
  public name = "Pet";
  public description = "This represent a Pet";
  public fields = () => petFields;
}

export const PetGraphQLType = new GraphQLObjectType(new Pet());
