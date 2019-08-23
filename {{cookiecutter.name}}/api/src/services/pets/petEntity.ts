import { IEntity } from "../IEntity";

export interface IPetEntity extends IEntity {
  id: string;
  name: string;
  petType: PetType;
}

export enum PetType {
  DOG,
  CAT
}