import { Pet } from "../../models/pet/pet.model";
import { petsSample } from "./pet.sample";

export class PetsService {
  pets: Pet[];

  constructor() {
    this.pets = petsSample;
  }

  async all(): Promise<Pet[]> {
    return Promise.resolve<Pet[]>(this.pets);
  }

  async byId(id: number): Promise<Pet | undefined> {
    const idx = await this.findIndex(id);

    if (!idx) {
      return Promise.resolve(undefined);
    }

    return this.pets[idx];
  }

  async byFilter(filter: (val: Pet, idx: number) => unknown): Promise<Pet[]> {
    return Promise.resolve(this.pets.filter(filter));
  }

  async create(pet: Pet): Promise<Pet> {
    const newId = this.pets.length + 1;
    const newObj = {
      id: newId,
      name: pet.name,
      type: pet.type
    };

    this.pets.push(newObj);
    return Promise.resolve(newObj);
  }

  async update(id: number, pet: Pet): Promise<Pet | undefined> {
    const idx = await this.findIndex(id);

    if (!idx) {
      return Promise.resolve(undefined);
    }

    const p = this.pets[idx];

    p.name = pet.name;
    p.type = pet.type;

    return p;
  }

  async delete(id: number): Promise<void> {
    const idx = await this.findIndex(id);

    if (idx) {
      this.pets = this.pets.splice(idx, 1);
    }
  }

  private findIndex(id: number): Promise<number | undefined> {
    const idx = this.pets.findIndex((pet: Pet) => {
      return pet.id === id;
    });

    if (idx === -1) {
      return Promise.resolve(undefined);
    }
    return Promise.resolve(idx);
  }
}

export default new PetsService();
