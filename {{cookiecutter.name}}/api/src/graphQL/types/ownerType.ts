import { GraphQLNonNull, GraphQLString, GraphQLList, GraphQLObjectType } from "graphql";
import { PetGraphQLType } from "./petType";
import getPetsByOwnerResolver from "../resolvers/getPetsByOwnerResolver";

class Owner {
  public name = "Owner";
  public description = "The owner of the pets";

  public fields = () => {
    return {
      id: {
        type: new GraphQLNonNull(GraphQLString)
      },
      name: {
        type: new GraphQLNonNull(GraphQLString)
      },
      pets: {
        type: new GraphQLNonNull(
          new GraphQLList(
            new GraphQLNonNull(
              PetGraphQLType
            )
          )
        ),
        resolve: getPetsByOwnerResolver
      }
    }
  }
}

export const OwnerGraphQLType = new GraphQLObjectType(new Owner());