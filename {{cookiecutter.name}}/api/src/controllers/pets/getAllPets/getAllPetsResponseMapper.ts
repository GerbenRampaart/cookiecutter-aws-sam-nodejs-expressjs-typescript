import { IPetEntity, PetType } from '../../../services/pets/petEntity';

export const getAllPetsResponseMapper = (pets: IPetEntity[]) => {
  
  return pets.map((pet: IPetEntity) => {
    return {
      id: pet.id,
      name: pet.name,
      petType: PetType[pet.petType]
    }
  });
};
