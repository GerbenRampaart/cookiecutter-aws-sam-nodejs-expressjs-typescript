import { Request, Response } from "express";
import petsService from "../../../services/pets/petsService";
import { getAllPetsResponseMapper } from "./getAllPetsResponseMapper";

const getAllPetsOperation = async (req: Request, res: Response) => {
  const all = await petsService.all();
  const responseModel = getAllPetsResponseMapper(all);
  res.send(responseModel);
};

export default getAllPetsOperation;
