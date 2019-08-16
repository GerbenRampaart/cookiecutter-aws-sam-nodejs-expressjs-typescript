export interface IPetEntity {
  id: string;
  name: string;
  type: PetType;
}

export enum PetType {
  DOG,
  CAT
}