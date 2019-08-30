import { PetEntity, PetType } from '../../../services/pets/petEntity';

export const getAllPetsResponseMapper = (pets: PetEntity[]) => {
  
  return pets.map((pet: PetEntity) => {
    return {
      id: pet.id,
      name: pet.name,
      petType: PetType[pet.petType]
    }
  });
};
