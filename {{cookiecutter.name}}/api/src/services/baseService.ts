import { Entity } from "./entity";
import { DataSource, DataSourceConfig } from "apollo-datasource";

export class BaseService<T extends Entity> extends DataSource {
  data: T[];

  initialize(config: DataSourceConfig<any>) {
    
  }

  constructor(data: T[] = []) {
    super();
    this.data = data;
  }

  async all(id?: string): Promise<T[]> {
    let entities = await Promise.resolve<T[]>(this.data);
    
    if (id) {
      entities = entities.filter((val: T) => {
        return val.id === id;
      });
    }

    return entities;
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
