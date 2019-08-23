import { GraphQLType, GraphQLNonNull, GraphQLString, GraphQLEnumType, GraphQLEnumValueConfigMap } from 'graphql';
import { PetGraphQLType } from '../types/petType';
import PetsService from '../../services/pets/petsService';
import { v1 } from 'uuid';
import { PetType } from '../../services/pets/petEntity';

export interface GraphQLMutation {
  type: GraphQLType;
  description: string;
  resolve: Function;
}

export interface ISavePetMutationArguments {
  id: string,
  name: string,
  petType: PetType
}

export class SavePetMutation implements GraphQLMutation {

  public type = PetGraphQLType;
  public description: string;

  constructor() {
    this.description = "Pets";
  }

  public args = {
    id: {
      type: new GraphQLNonNull(GraphQLString)
    },
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    petType: {
      type: new GraphQLNonNull(new GraphQLEnumType({
        name: "PetType",
        values: (() => {
          const graphQLMap: GraphQLEnumValueConfigMap = {};

          Object.keys(PetType).forEach((key: string) => {
            graphQLMap[key] = (<any>PetType)[key];
          });

          return graphQLMap;
        })()
      })
      )
    }
  };

  public resolve = async (args: ISavePetMutationArguments) => {
    const existingPet = await PetsService.byId(args.id);

    if (existingPet) {

      existingPet.name = args.name;
      existingPet.petType = args.petType;

      return await PetsService.update(existingPet);
    } else {
      const newId = v1();
      return await PetsService.create({
        id: newId,
        name: args.name,
        petType: args.petType
      });
    }
  }

}