import { byPage } from '../../arguments/byPage';

export interface petsByPageArgs extends byPage {
  orderType: "NAME_ASC" | "NAME_DESC";
}