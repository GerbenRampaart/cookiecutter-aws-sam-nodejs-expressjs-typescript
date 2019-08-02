export interface IPet {
    id: number;
    name: string;
    type: PetType;
}

export enum PetType {
    DOG, CAT
}