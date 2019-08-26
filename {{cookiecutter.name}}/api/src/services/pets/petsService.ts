import sample from "./sample";
import { PetEntity } from "./petEntity";
import BaseService from "../baseService";

export class PetsService extends BaseService<PetEntity> {
  constructor() {
    super(sample);
  }
}

export default new PetsService();
