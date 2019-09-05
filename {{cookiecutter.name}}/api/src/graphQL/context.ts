import { OwnersService } from "../services/owners/ownersService";
import { PetsService } from "../services/pets/petsService";

export interface Context {
  dataSources: {
    ownersService: OwnersService;
    petsService: PetsService;
  }
}
