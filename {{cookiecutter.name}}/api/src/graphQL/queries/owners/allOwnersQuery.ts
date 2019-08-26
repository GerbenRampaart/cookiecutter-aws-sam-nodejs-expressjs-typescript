import {
  GraphQLList
} from 'graphql';

import { IGraphQLQuery } from '../IGraphQLQuery'
import OwnersService from '../../../services/owners/ownersService';
import { OwnerGraphQLType } from '../../types/owner/ownerType';

export class AllOwnersQuery implements IGraphQLQuery {

  public type = new GraphQLList(OwnerGraphQLType);
  public description: string;

  constructor() {
    this.description = "List of all owners";
  }

  public resolve = async () => {
    return await OwnersService.all();
  }    

}