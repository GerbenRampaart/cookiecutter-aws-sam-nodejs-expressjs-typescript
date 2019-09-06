import { PetModel } from '../../models/petModel';
import { PetEntity, PetType } from '../../../services/pets/petEntity';

export const mapToPetEntity = (model: PetModel): PetEntity => {
  return {
    id: model.id,
    name: model.name,
    petType: (<any>PetType)[model.petType],
    owner: model.owner
  };
}

export const mapToPetModel = (entity: PetEntity): PetModel => {
  return {
    id: entity.id,
    name: entity.name,
    fullName: `${entity.name} full`,
    petType: PetType[entity.petType],
    owner: entity.owner
  };
}

export const mapToPetEntities = (models: PetModel[]): PetEntity[] => {
  return models.map((model: PetModel) => {
    return mapToPetEntity(model);
  });
}

export const mapToPetModels = (entities: PetEntity[]): PetModel[] => {
  return entities.map((entity: PetEntity) => {
    return mapToPetModel(entity);
  });
}