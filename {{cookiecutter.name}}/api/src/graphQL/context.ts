import PetsService from "../../services/pets/petsService";
import OwnersService from "../../services/owners/ownersService";

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