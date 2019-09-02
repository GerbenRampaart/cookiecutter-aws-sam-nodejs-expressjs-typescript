import { PetEntity, PetType } from "./petEntity";

const pets: PetEntity[] = [
  {
    "id": "5481c892-35a5-44d6-b422-e29be9b835b8",
    "name": "Max",
    "petType": PetType.DOG,
    "owner": "fbc60a27-973e-4077-9137-ec74e7aca8b5"
  },
  {
    "id": "65d7a21d-039f-4cf7-b905-0bdf41b54ca1",
    "name": "Napoleon",
    "petType": PetType.CAT,
    "owner": "25b5bff0-606b-4e8c-9648-306774ba6df1"
  },
  {
    "id": "6a4718b5-0781-4545-b484-17f07845749d",
    "name": "Lassy",
    "petType": PetType.DOG,
    "owner": "2355810e-7298-4e22-9026-f735f2e6c593"
  },
  {
    "id": "02c769ae-4c07-43f9-955d-a280be418d4b",
    "name": "Cleo",
    "petType": PetType.CAT,
    "owner": "2355810e-7298-4e22-9026-f735f2e6c593"
  }
]

export default pets;