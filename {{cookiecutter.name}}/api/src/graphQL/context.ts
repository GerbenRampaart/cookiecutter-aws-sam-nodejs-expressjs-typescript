import { OwnersService } from "../services/owners/ownersService";
import { PetsService } from "../services/pets/petsService";

export interface Context {
  dataSources: {
    ownerService: OwnersService;
    petService: PetsService;
  }
}

export const context: Context = {
  dataSources: {
    ownerService: new OwnersService(),
    petService: new PetsService()
  }
}