import { Request, Response } from "express";
import petsService from "../../../services/pets/service";
import { getAllPetsMapper } from "./getAllPetsMapper";

const getAllPetsOperation = async (req: Request, res: Response) => {
  const all = await petsService.all();
  const responseModel = getAllPetsMapper(all);
  res.send(responseModel);
};

export default getAllPetsOperation;
