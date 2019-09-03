import { Request, Response } from "express";
import { getAllPetsResponseMapper } from "./getAllPetsResponseMapper";
import { PetsService } from '../../../services/pets/petsService';

export const getAllPetsOperation = async (req: Request, res: Response) => {
  const petsService = new PetsService();
  const all = await petsService.all();
  const responseModel = getAllPetsResponseMapper(all);
  res.send(responseModel);
};
