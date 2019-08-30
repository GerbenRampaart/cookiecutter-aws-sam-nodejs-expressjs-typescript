import { PetsService } from "../../services/pets/petsService";
import { OwnersService } from "../../services/owners/ownersService";

export interface Context {
  models: {
    ownerService: typeof OwnersService;
    petService: typeof PetsService;
  }
}

export const context: Context = {
  models: {
    ownerService: OwnersService,
    petService: PetsService
  }
}