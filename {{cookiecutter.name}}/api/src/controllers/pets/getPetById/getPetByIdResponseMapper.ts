import { PetEntity, PetType } from "../../../services/pets/petEntity";

export const getPetByIdResponseMapper = (pet: PetEntity) => {
  
  return {
    id: pet.id,
    name: pet.name,
    petType: PetType[pet.petType]
  }

};
