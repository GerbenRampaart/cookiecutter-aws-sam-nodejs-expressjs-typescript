import sample from "./sample";
import { IPetEntity } from "./petEntity";

export class PetsService {
  pets: IPetEntity[];

  constructor() {
    this.pets = sample;
  }

  async all(): Promise<IPetEntity[]> {
    return Promise.resolve<IPetEntity[]>(this.pets);
  }

  async byId(id: string): Promise<IPetEntity | undefined> {
    const idx = await this.findIndex(id);

    if (idx === -1) {
      return Promise.resolve(undefined);
    }

    return this.pets[idx];
  }

  async byFilter(filter: (val: IPetEntity, idx: number) => unknown): Promise<IPetEntity[]> {
    return Promise.resolve(this.pets.filter(filter));
  }

  async create(pet: IPetEntity): Promise<IPetEntity> {
    this.pets.push(pet);
    return Promise.resolve(pet);
  }

  async update(pet: IPetEntity): Promise<IPetEntity | undefined> {
    const idx = await this.findIndex(pet.id);

    if (idx === -1) {
      return Promise.resolve(undefined);
    }

    const p = this.pets[idx];

    p.name = pet.name;
    p.petType = pet.petType;

    return Promise.resolve(p);
  }

  async delete(id: string): Promise<void> {
    const idx = await this.findIndex(id);

    if (idx > -1) {
      this.pets.splice(idx, 1);
    }

    return Promise.resolve();
  }

  private findIndex(id: string): Promise<number> {
    const idx = this.pets.findIndex((pet: IPetEntity) => {
      return pet.id === id;
    });

    return Promise.resolve(idx);
  }
}

export default new PetsService();
