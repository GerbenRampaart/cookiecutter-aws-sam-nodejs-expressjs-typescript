import { Context } from "../../context";
import { OwnerModel } from "../../models/ownerModel";
import { OwnerEntity } from "../../../services/owners/ownerEntity";

export const ownersResolvers = (_, )
  owners: async (parent: any, args: any, ctx: Context): Promise<OwnerModel[]> => {
    const entities = await ctx.dataSources.ownerService.all();

    return entities.map((e: OwnerEntity) => {
      return {
        id: e.id,
        name: e.name,
        pets: e.pets
      }
    })
  },

}