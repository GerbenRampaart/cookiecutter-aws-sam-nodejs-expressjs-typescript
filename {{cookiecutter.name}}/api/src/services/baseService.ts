import { Entity } from "./entity";

export class BaseService<T extends Entity> {
  data: T[];

  constructor(data: T[] = []) {
    this.data = data;
  }

  async all(): Promise<T[]> {
    return Promise.resolve<T[]>(this.data);
  }

  async byId(id: string): Promise<T | undefined> {
    const idx = await this.findIndex(id);

    if (idx === -1) {
      return Promise.resolve(undefined);
    }

    return this.data[idx];
  }

  async byFilter(filter: (val: T, idx: number) => unknown): Promise<T[]> {
    return Promise.resolve(this.data.filter(filter));
  }

  async create(entity: T): Promise<T> {
    this.data.push(entity);
    return Promise.resolve(entity);
  }

  async update(entity: T): Promise<T | undefined> {
    const idx = await this.findIndex(entity.id);

    if (idx === -1) {
      return Promise.resolve(undefined);
    }

    this.data[idx] = entity;

    return Promise.resolve(this.data[idx]);
  }

  async delete(id: string): Promise<void> {
    const idx = await this.findIndex(id);

    if (idx > -1) {
      this.data.splice(idx, 1);
    }

    return Promise.resolve();
  }

  private findIndex(id: string): Promise<number> {
    const idx = this.data.findIndex((entity: T) => {
      return entity.id === id;
    });

    return Promise.resolve(idx);
  }
}
