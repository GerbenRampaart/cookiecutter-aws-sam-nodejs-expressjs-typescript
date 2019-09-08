import { Context } from "../context";
import { IResolvers } from "apollo-server-express";
import { OwnerModel } from "../models/ownerModel";
import { PetModel } from "../models/petModel";
import { PetEntity } from "../../services/pets/petEntity";
import { mapToPetModels } from "./pets/petsMapper";
import { mapToOwnerModels } from "./owners/ownersMapper";
import { byId } from "../arguments/byId";
import { ownersByPageArgs } from "./owners/ownersByPageArgs";
import { OwnerOrderType } from "./owners/ownerOrderType";

export const resolvers: IResolvers = {
  Query: {
    owners: async (_, { id }: byId, ctx: Context): Promise<OwnerModel[]> => {
      const entities = await ctx.dataSources.ownersService.all(id);
      return mapToOwnerModels(entities);
    },
    pets: async (_, { id }: byId, ctx: Context): Promise<PetModel[]> => {
      const entities = await ctx.dataSources.petsService.all(id);
      return mapToPetModels(entities);
    },
    ownersByPage: async (_, page: ownersByPageArgs, ctx: Context): Promise<OwnerModel[]> => {
      let entities = await ctx.dataSources.ownersService.all();
      const order = page.orderType as OwnerOrderType;
console.log(order === OwnerOrderType.NAME_DESC);
      entities.sort((a, b) => (a.name > b.name) ? 1 : -1)

      if (order === OwnerOrderType.NAME_DESC) {
        console.log(entities);
        entities.reverse();
        console.log(entities)
      }

      if (page.offset) {
        entities.splice(0, page.offset);
      }

      if (page.limit) {
        entities.slice(0, page.limit);
      }

      return mapToOwnerModels(entities);
    },

  },
  Owner: {
    pets: async (owner: OwnerModel, { id }: byId, ctx: Context): Promise<PetModel[]> => {
      let pets = await ctx.dataSources.petsService.all(id);
      pets = pets.filter((pet: PetEntity) => owner.pets.indexOf(pet.id) > -1);
      return mapToPetModels(pets);
    }
  },
  Pet: {
    owner: async (pet: PetModel, _, ctx: Context) => {
      const entities = await ctx.dataSources.ownersService.all(pet.owner);
      return mapToOwnerModels(entities);
    }
  }
};
