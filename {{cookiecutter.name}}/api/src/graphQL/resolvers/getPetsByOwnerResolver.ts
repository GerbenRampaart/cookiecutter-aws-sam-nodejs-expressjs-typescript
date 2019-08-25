import { IOwnerEntity } from "../../services/owners/ownerEntity";
import { IPetEntity } from "../../services/pets/petEntity";
import PetsService from "../../services/pets/petsService";

const getPetsByOwnerResolver = async (owner: IOwnerEntity): Promise<IPetEntity[]> => {
  const allPets = await PetsService.all();
  
  return allPets.filter((pet: IPetEntity) => {
    return owner.pets.indexOf(pet.id) > -1;
  });
};

export default getPetsByOwnerResolver;