import { GraphQLNonNull, GraphQLString, GraphQLList, GraphQLObjectType } from "graphql";
import getPetsByOwnerResolver from "../../resolvers/getPetsByOwnerResolver";
import { PetGraphQLType } from '../pet/petType';

const OwnerFields = {
  id: {
    type: new GraphQLNonNull(GraphQLString)
  },
  name: {
    type: new GraphQLNonNull(GraphQLString)
  },
  pets: {
    type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(PetGraphQLType))),
    resolve: getPetsByOwnerResolver
  }
};

class OwnerType {
  public name = "Owner";
  public description = "The owner of the pets";
  public fields = () => OwnerFields;
}

export const OwnerGraphQLType = new GraphQLObjectType(new OwnerType());
