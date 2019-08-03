import { PetType } from "./petType.enum";

export interface IPet {
    id?: number;
    name: string;
    type: PetType;
}
