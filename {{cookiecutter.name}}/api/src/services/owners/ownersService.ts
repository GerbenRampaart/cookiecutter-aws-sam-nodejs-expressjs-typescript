import sample from "./sample";
import { OwnerEntity } from "./ownerEntity";
import BaseService from "../baseService";

export class OwnersService extends BaseService<OwnerEntity> {
  constructor() {
    super(sample);
  }
}

export default new OwnersService();
