import { OwnerEntity } from "../../services/owners/ownerEntity";
import { PetEntity } from "../../services/pets/petEntity";
import PetsService from "../../services/pets/petsService";




const getPetsByOwnerResolver = async (owner: OwnerEntity): Promise<PetEntity[]> => {
  const allPets = await PetsService.all();
  
  return allPets.filter((pet: PetEntity) => {
    return owner.pets.indexOf(pet.id) > -1;
  });
};

export default getPetsByOwnerResolver;