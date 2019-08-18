import { IPetEntity, PetType } from "../../../services/pets/petEntity";

export const updatePetResponseMapper = (pet: IPetEntity) => {
  
  return {
    id: pet.id,
    name: pet.name,
    type: PetType[pet.type]
  }

};
