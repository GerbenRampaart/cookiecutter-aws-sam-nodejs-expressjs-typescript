export interface Entity {
  id: string;
  name: string;
  type: PetType;
}

export enum PetType {
  DOG,
  CAT
}