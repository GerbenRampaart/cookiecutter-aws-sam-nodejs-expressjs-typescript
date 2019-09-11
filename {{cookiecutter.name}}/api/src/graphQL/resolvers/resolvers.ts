import { Context } from "../context";
import { IResolvers } from "apollo-server-express";
import { OwnerModel } from "../models/ownerModel";
import { PetModel } from "../models/petModel";
import { PetEntity } from "../../services/pets/petEntity";
import { mapToPetModels } from "./pets/petsMapper";
import { mapToOwnerModels, mapToOwnerModel } from "./owners/ownersMapper";
import { byId } from "../arguments/byId";
import { ownersByPageArgs } from "./owners/ownersByPageArgs";

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

      entities.sort((a, b) => (a.name > b.name) ? 1 : -1)

      if (page.orderType === "NAME_DESC") {
        entities.reverse();
      }

      entities.splice(0, page.offset);
      entities.splice(page.limit);

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

      if (entities.length !== 1) {
        return null;
      } else {
        return mapToOwnerModel(entities[0]);
      }
    }
  }
};
