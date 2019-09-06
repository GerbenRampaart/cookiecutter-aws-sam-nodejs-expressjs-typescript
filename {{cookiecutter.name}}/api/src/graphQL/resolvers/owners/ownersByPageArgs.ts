import { OwnerOrderType } from './ownerOrderType';
import { byPage } from '../../arguments/byPage';

export interface ownersByPageArgs extends byPage {
  orderType?: OwnerOrderType;
}