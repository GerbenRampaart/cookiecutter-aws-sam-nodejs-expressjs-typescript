import * as Joi from "@hapi/joi";

export interface IRequestModel {
  name: string;
  type: PetType;
}

export enum PetType {
  DOG,
  CAT
}

export const schema = Joi.object().keys({
  name: Joi.string().required(),
  type: Joi.string().valid(PetType.CAT, PetType.DOG).required()
});