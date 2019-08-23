import {
  GraphQLType,
} from 'graphql';


export interface IGraphQLQuery {
  type: GraphQLType;
  description: string;
  resolve: Function;
}