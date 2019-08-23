import { IEntity } from "../IEntity";

export interface IOwnerEntity extends IEntity {
  id: string;
  name: string;
  pets: string[];
}
