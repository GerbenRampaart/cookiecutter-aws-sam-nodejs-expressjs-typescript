import { OwnerEntity } from '../../../services/owners/ownerEntity';
import { OwnerModel } from '../../models/ownerModel';

export const mapToOwnerEntity = (model: OwnerModel): OwnerEntity => {
  return {
    id: model.id,
    name: model.name,
    pets: model.pets
  };
}

export const mapToOwnerModel = (entity: OwnerEntity): OwnerModel => {
  return {
    id: entity.id,
    name: entity.name,
    pets: entity.pets    
  };
}

export const mapToOwnerEntities = (models: OwnerModel[]): OwnerEntity[] => {
  return models.map((model: OwnerModel) => {
    return mapToOwnerEntity(model);
  });
}

export const mapToOwnerModels = (entities: OwnerEntity[]): OwnerModel[] => {
  return entities.map((entity: OwnerEntity) => {
    return mapToOwnerModel(entity);
  });
}