import { Request, Response, NextFunction} from "express";
import petsService from "../../../services/pets/petsService";
import { updatePetRequestParams } from "./updatePetRequestParams";
import NotFound from "../../../exceptions/notFound";
import { updatePetRequestBody } from "./updatePetRequestBody";
import BadRequest from "../../../exceptions/badRequest";
import { PetType } from "../../../services/pets/petEntity";
import { updatePetResponseMapper } from "./updatePetResponseMapper";

const updatePetOperation = async (req: Request, res: Response, next: NextFunction) => {
  const params: updatePetRequestParams = req.params;
  const body: updatePetRequestBody = req.body;

  const existingPet = await petsService.byId(params.id);

  if (!existingPet) {
    return next(new NotFound(params.id));
  }
  
  const pet = await petsService.update({
    id: params.id,
    name: body.name,
    petType: (<any>PetType)[body.type]
  });

  if (!pet) {
    return next(new BadRequest(`pet ${params.id} not successfully updated`));
  }

  const responseModel = updatePetResponseMapper(pet!);

  res
    .status(200)
    .location(`/api/pets/${pet!.id}`)
    .send(responseModel);
}

export default updatePetOperation;