import { pets } from "./sample";
import { PetEntity } from "./petEntity";
import { BaseService } from "../baseService";

export class PetsService extends BaseService<PetEntity> {
  constructor() {
    super(pets);
  }
}
