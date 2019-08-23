import sample from "./sample";
import { IOwnerEntity } from "./ownerEntity";
import BaseService from "../baseService";

export class OwnersService extends BaseService<IOwnerEntity> {
  constructor() {
    super(sample);
  }
}

export default new OwnersService();
