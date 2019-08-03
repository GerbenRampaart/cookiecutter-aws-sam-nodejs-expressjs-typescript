import { IPet } from "../../models/pet/pet.model";
import { PetType } from "../../models/pet/petType.enum";

export const petsSample: IPet[] = [
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