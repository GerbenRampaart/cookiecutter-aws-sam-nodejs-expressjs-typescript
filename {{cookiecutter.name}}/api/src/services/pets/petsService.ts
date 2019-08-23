import sample from "./sample";
import { IPetEntity } from "./petEntity";
import BaseService from "../baseService";

export class PetsService extends BaseService<IPetEntity> {
  constructor() {
    super(sample);
  }
}

export default new PetsService();
