import sample from "./sample";
import { Entity } from "./entity";
import { v1 } from "uuid";

export class Service {
  pets: Entity[];

  constructor() {
    this.pets = sample;
  }

  async all(): Promise<Entity[]> {
    return Promise.resolve<Entity[]>(this.pets);
  }

  async byId(id: string): Promise<Entity | undefined> {
    const idx = await this.findIndex(id);

    if (!idx) {
      return Promise.resolve(undefined);
    }

    return this.pets[idx];
  }

  async byFilter(filter: (val: Entity, idx: number) => unknown): Promise<Entity[]> {
    return Promise.resolve(this.pets.filter(filter));
  }

  async create(pet: Entity): Promise<Entity> {
    const newId = v1();
    const newObj = {
      id: newId,
      name: pet.name,
      type: pet.type
    };

    this.pets.push(newObj);
    return Promise.resolve(newObj);
  }

  async update(id: string, pet: Entity): Promise<Entity | undefined> {
    const idx = await this.findIndex(id);

    if (!idx) {
      return Promise.resolve(undefined);
    }

    const p = this.pets[idx];

    p.name = pet.name;
    p.type = pet.type;

    return p;
  }

  async delete(id: string): Promise<void> {
    const idx = await this.findIndex(id);

    if (idx) {
      this.pets = this.pets.splice(idx, 1);
    }
  }

  private findIndex(id: string): Promise<number | undefined> {
    const idx = this.pets.findIndex((pet: Entity) => {
      return pet.id === id;
    });

    if (idx === -1) {
      return Promise.resolve(undefined);
    }
    return Promise.resolve(idx);
  }
}

export default new Service();
