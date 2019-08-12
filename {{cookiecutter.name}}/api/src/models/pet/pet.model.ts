import petType from "./petType.enum";

// https://wanago.io/2018/12/17/typescript-express-error-handling-validation/

export interface Pet {
  id?: number;
  name: string;
  type: petType;
}
