import { GraphQLType } from 'graphql';
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
  petType: PetType,
  owner: string
}

/*
Object.keys(PetType).forEach((key: string) => {
  graphQLMap[key] = (<any>PetType)[key];
});*/

export const resolve = async (args: ISavePetMutationArguments) => {
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
      petType: args.petType,
      owner: args.owner
    });
  }
}

