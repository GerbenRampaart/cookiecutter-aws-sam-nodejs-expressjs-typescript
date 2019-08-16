import { IPetEntity } from '../../../services/pets/petEntity';

export const getAllPetsMapper = (pets: IPetEntity[]) => {
  
  return pets.map((pet: IPetEntity) => {
    return {
      id: pet.id,
      name: pet.name,
      type: pet.type.toString()
    }
  });
};
