import OwnersService from "../services/owners/ownersService";
import PetsService from "../services/pets/petsService";


export interface Context {
  services: {
    ownerService: typeof OwnersService;
    petService: typeof PetsService;
  }
}

export const context: Context = {
  services: {
    ownerService: OwnersService,
    petService: PetsService
  }
}