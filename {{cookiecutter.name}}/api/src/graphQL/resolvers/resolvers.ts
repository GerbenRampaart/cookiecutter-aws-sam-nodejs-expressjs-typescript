import { Context } from "../context";
import { IResolvers } from "apollo-server-express";
import { OwnerModel } from "../models/ownerModel";
import { PetModel } from "../models/petModel";
import { PetEntity } from "../../services/pets/petEntity";
import { mapToPetModels, mapToPetModel } from "./pets/petsMapper";
import { mapToOwnerModels, mapToOwnerModel } from "./owners/ownersMapper";
import { throwIfUndefined } from '../exceptions/throwIfUndefined';
import { byId } from "../arguments/byId";
import { ownersByPageArgs } from "./owners/ownersByPageArgs";
import { OwnerOrderType } from "./owners/ownerOrderType";

export const resolvers: IResolvers = {
  Query: {
    owners: async (_, { id }, ctx: Context): Promise<OwnerModel[] | OwnerModel> => {
      if (!id) {
        const entities = await ctx.dataSources.ownersService.all();
        return mapToOwnerModels(entities);
      } else {
        const entity = await ctx.dataSources.ownersService.byId(id);
        throwIfUndefined(entity, 404, `${id} not found`);
        return mapToOwnerModel(entity!);
      }
    },
    pets: async (_, { id }: byId, ctx: Context): Promise<PetModel[] | PetModel> => {
      if (!id) {
        const entities = await ctx.dataSources.petsService.all();
        return mapToPetModels(entities);
      } else {
        const entity = await ctx.dataSources.petsService.byId(id);
        throwIfUndefined(entity, 404, `${id} not found`);
        return mapToPetModel(entity!);
      }
    },
    ownersByPage: async (_, page: ownersByPageArgs, ctx: Context): Promise<OwnerModel[] | OwnerModel> => {
      let entities = await ctx.dataSources.ownersService.all();
      const order = page.orderType as OwnerOrderType;

      entities.sort((a, b) => (a.name > b.name) ? 1 : -1)

      if (order === OwnerOrderType.NAME_DESC) {
        entities.reverse();
      }

      if (page.offset) {
        entities.splice(page.offset);
      }

      if (page.limit) {
        entities.slice(0, page.limit);
      }

      return mapToOwnerModels(entities);
    },

  },
  Owner: {
    pets: async (owner: OwnerModel, { id }, ctx: Context): Promise<PetModel[]> => {
      let pets = await ctx.dataSources.petsService.all();
      pets = pets.filter((pet: PetEntity) => owner.pets.indexOf(pet.id) > -1);
      return mapToPetModels(pets);
    }
  },
  Pet: {
    owner: async (pet: PetModel, _, ctx: Context) => {
      const owner = await ctx.dataSources.ownersService.byId(pet.owner!);
      throwIfUndefined(owner, 404, `${pet.owner} not found`);
      return mapToOwnerModel(owner!);
    }
  }
};
