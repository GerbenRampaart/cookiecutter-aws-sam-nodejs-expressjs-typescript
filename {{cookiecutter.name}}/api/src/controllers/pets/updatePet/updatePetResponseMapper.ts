import { PetEntity, PetType } from "../../../services/pets/petEntity";

export const updatePetResponseMapper = (pet: PetEntity) => {
  
  return {
    id: pet.id,
    name: pet.name,
    petType: PetType[pet.petType]
  }

};
