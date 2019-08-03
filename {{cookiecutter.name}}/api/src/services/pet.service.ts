import { IPet, PetType } from "../models/pet.model";

export class PetsService {
    async all(): Promise<IPet[]> {
        return Promise.resolve<IPet[]>(pets);
    }

    async byId(id: number): Promise<IPet | undefined> {
        const idx = pets.findIndex((pet: IPet) => {
            return pet.id === id;
        });

        // findIndex will return -1 if the item is not found
        if (idx === -1) {
            return Promise.resolve(undefined);
        }

        return pets[idx];
    }

    async byFilter(filter: (val: IPet, idx: number) => IPet): Promise<IPet[]> {
        return Promise.resolve(pets.filter(filter));
    }

    async create(pet: IPet): Promise<number> {
        const newId = pets.length + 1;
        pets.push({
            id: newId,
            name: pet.name,
            type: pet.type 
        });
        return Promise.resolve(newId);
    }

    async update(id: number, pet: IPet): Promise<IPet | undefined> {
        const idx = pets.findIndex((pet: IPet) => {
            return pet.id === id;
        });

        if (!idx) {
            return Promise.resolve(undefined);
        }

        const p = pets[idx];
        
        p.name = pet.name;
        p.type = pet.type;
        
        return p;
    }

    async delete(id: number): Promise<void> {
        const idx = pets.findIndex((pet: IPet) => {
            return pet.id === id;
        });

        if (!idx) {
            return Promise.resolve(undefined);
        }

        pets = pets.splice(idx, 1);
    }
}

let pets: IPet[] = [
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