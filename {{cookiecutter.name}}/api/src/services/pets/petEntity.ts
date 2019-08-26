import { Entity } from "../entity";

export interface PetEntity extends Entity {
  id: string;
  name: string;
  petType: PetType;
}

export enum PetType {
  DOG,
  CAT
}