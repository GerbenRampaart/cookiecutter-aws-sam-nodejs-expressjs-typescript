import { byPage } from '../../arguments/byPage';
import { PetOrderType} from "./petOrderType";

export interface petsByPageArgs extends byPage {
  orderType?: PetOrderType;
}