import { owners } from "./sample";
import { OwnerEntity } from "./ownerEntity";
import { BaseService } from "../baseService";

export class OwnersService extends BaseService<OwnerEntity> {
  constructor() {
    super(owners);
  }
}

