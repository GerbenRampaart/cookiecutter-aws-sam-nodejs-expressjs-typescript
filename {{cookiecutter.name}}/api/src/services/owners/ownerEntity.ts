import { Entity } from '../entity';

export interface OwnerEntity extends Entity {
  id: string;
  name: string;
  pets: string[];
}
