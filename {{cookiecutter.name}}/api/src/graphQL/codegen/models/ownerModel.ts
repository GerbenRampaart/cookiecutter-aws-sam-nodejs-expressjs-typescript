import { PetModel } from "./petModel";

export interface OwnerModel {
  id: string;
  name: string;
  pets:
   PetModel[];
}

