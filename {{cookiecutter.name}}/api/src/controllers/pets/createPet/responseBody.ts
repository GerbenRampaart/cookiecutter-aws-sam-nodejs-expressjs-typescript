import { Entity } from "../../../services/pets/entity";

export const responseBodyMapper = (pet: Entity) => {
  
  const body: IResponseModel = {
    id: pet.id,
    name: pet.name,
    type: pet.type
  }

  return body;
};

export interface IResponseModel {
  id: string;
  name: string;
  type: PetType;
}

export enum PetType {
  DOG,
  CAT
}