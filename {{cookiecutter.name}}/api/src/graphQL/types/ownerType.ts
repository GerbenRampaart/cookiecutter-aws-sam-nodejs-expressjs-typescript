import { GraphQLNonNull, GraphQLString, GraphQLList, GraphQLObjectType } from "graphql";
import { PetGraphQLType } from "./petType";
import { IOwnerEntity } from "../../services/owners/ownerEntity";
import PetsService from "../../services/pets/petsService";
import { IPetEntity } from "../../services/pets/petEntity";

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
        resolve: async (owner: IOwnerEntity, args: any) => {
          console.log(owner);
          console.log(args);
          const result: IPetEntity[] = [];
          const allPets = await PetsService.all();
          
          allPets.forEach((pet: IPetEntity) => {
            const foundPetId = owner.pets.find((id: string) => {
              return id === pet.id;
            })

            if (foundPetId) {
              result.push(pet);
            }
          });

          return result;
        }
      }
    }
  }
}

export const OwnerGraphQLType = new GraphQLObjectType(new Owner());