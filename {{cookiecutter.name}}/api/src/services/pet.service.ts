import { IPet, PetType } from "../models/pet.model";

export class PetsService {
    all(): Promise<IPet[]> {
        return Promise.resolve(pets);
    }

    byId(): Promise<IPet> {
        return this.all
    }
}

const pets: IPet[] = [
    {
        id: 1,
        name: "Max",
        type: PetType.DOG
    },
    {
        id: 2,
        name: "Napoleon",
        type: PetType.CAT
    },    
    {
        id: 3,
        name: "Lassy",
        type: PetType.DOG
    },    
    {
        id: 4,
        name: "Cleo",
        type: PetType.CAT
    },
];