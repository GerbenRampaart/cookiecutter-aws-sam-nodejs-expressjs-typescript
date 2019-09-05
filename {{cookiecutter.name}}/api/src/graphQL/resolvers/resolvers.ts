import { Context } from "../context";
import { IResolvers } from "apollo-server-express";
import { OwnerModel } from "../models/ownerModel";
import { OwnerEntity } from "../../services/owners/ownerEntity";
import { PetModel } from "../models/petModel";
import { PetEntity, PetType } from "../../services/pets/petEntity";

export const resolvers: IResolvers = {
  Query: {
    owners: async (parent: any, args: any, ctx: Context): Promise<OwnerModel[]> => {
      const entities = await ctx.dataSources.ownersService.all();

      return entities.map((e: OwnerEntity) => {
        return {
          id: e.id,
          name: e.name,
          pets: e.pets
        }
      })
    },
    pets: async (parent: any, args: , ctx: Context): Promise<PetModel[]> => {
      const entities = await ctx.dataSources.petsService.all();

      return entities.map((e: PetEntity) => {
        return {
          id: e.id,
          name: e.name,
          fullName: `${e.name} full`,
          petType: PetType[e.petType],
          owner: e.owner
        }
      })
    }
  },
  Owner: {
    pets: async (owner: OwnerModel, args: any, ctx: Context) => {
      let pets = await ctx.dataSources.petsService.all();
      pets = pets.filter((pet: PetEntity) => owner.pets.indexOf(pet.id) > -1);
      return pets.map((e: PetEntity) => {
        return {
          id: e.id,
          name: e.name,
          fullName: `${e.name} full`,
          petType: PetType[e.petType],
          owner: e.owner
        }
      });
    }
  },
  Pet: {
    owner: async (pet: PetModel, args: any, ctx: Context) => {
      const owner = await ctx.dataSources.ownersService.byId(pet.owner!);

      if (!owner) {
        return Promise.resolve(undefined);
      } else {
        return {
          id: owner.id,
          name: owner.name,
          pets: owner.pets
        }
      }
    }


  }

}