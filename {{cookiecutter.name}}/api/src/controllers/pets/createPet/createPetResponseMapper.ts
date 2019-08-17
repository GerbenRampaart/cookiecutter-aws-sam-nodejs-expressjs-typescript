import { IPetEntity } from "../../../services/pets/petEntity";

export const createPetResponseMapper = (pet: IPetEntity) => {
  
  return {
    id: pet.id,
    name: pet.name,
    type: pet.type.toString()
  }

};
