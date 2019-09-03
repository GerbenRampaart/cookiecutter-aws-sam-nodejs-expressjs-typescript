import { OwnerEntity } from "../../services/owners/ownerEntity";
import { PetEntity } from "../../services/pets/petEntity";
import { PetsService } from "../../services/pets/petsService";

export const getPetsByOwnerResolver = async (owner: OwnerEntity): Promise<PetEntity[]> => {
  const petsService = new PetsService();
  const allPets = await petsService.all();
  
  return allPets.filter((pet: PetEntity) => {
    return owner.pets.indexOf(pet.id) > -1;
  });
};
