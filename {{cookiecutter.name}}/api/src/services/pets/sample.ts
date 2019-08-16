import { IPetEntity, PetType } from "./petEntity";

const pets: IPetEntity[] = [
  {
    "id": "5481c892-35a5-44d6-b422-e29be9b835b8",
    "name": "Max",
    "type": PetType.DOG
  },
  {
    "id": "65d7a21d-039f-4cf7-b905-0bdf41b54ca1",
    "name": "Napoleon",
    "type": PetType.CAT
  },
  {
    "id": "6a4718b5-0781-4545-b484-17f07845749d",
    "name": "Lassy",
    "type": PetType.DOG
  },
  {
    "id": "02c769ae-4c07-43f9-955d-a280be418d4b",
    "name": "Cleo",
    "type": PetType.CAT
  }
]

export default pets;