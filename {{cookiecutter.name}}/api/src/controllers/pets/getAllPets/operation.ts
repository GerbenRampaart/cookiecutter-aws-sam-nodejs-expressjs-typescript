import { Request, Response } from "express";
import petsService from "../../../services/pets/service";

const getAllPets = async (req: Request, res: Response) => {
  const all = await petsService.all();
  res.send(all);
};

export default getAllPets;
