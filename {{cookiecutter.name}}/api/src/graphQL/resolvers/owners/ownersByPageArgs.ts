import { byPage } from '../../arguments/byPage';

export interface ownersByPageArgs extends byPage {
  orderType: "NAME_ASC" | "NAME_DESC";
}