import { OwnerModel } from "./ownerModel";

export interface PetModel {
  id: string;
  name: string;
  fullName: string;
  petType: string;
  owner: OwnerModel
}
