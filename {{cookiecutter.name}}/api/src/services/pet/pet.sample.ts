import { Pet } from "../../models/pet/pet.model";
import petType from "../../models/pet/petType.enum";

export const petsSample: Pet[] = [
  {
    id: 1,
    name: "Max",
    type: petType.DOG
  },
  {
    id: 2,
    name: "Napoleon",
    type: petType.CAT
  },
  {
    id: 3,
    name: "Lassy",
    type: petType.DOG
  },
  {
    id: 4,
    name: "Cleo",
    type: petType.CAT
  }
];

export default petsSample;
