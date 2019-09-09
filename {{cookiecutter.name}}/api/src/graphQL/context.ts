import { OwnersService } from "../services/owners/ownersService";
import { PetsService } from "../services/pets/petsService";

export interface Context {
  dataSources: {
    ownersService: OwnersService;
    petsService: PetsService;
  }
}

export const context: Context = {
  dataSources: {
    ownersService: new OwnersService(),
    petsService: new PetsService()
  }
}