export interface IPetEntity {
  id: string;
  name: string;
  petType: PetType;
}

export enum PetType {
  DOG,
  CAT
}