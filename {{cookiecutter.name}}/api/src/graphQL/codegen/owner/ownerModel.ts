import { PetModel } from "../pet/petModel";

export interface OwnerModel {
  id: string;
  name: string;
  pets:
   PetModel[];
}

