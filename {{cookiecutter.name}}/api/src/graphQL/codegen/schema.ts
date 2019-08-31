import { GraphQLResolveInfo } from 'graphql';
import { Context } from './context';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type Entity = {
  id: Scalars['ID'],
};

export type InputOwner = {
  name: Scalars['String'],
  pets?: Maybe<Array<Scalars['String']>>,
};

export type InputPet = {
  name: Scalars['String'],
  petType: Pettype,
};

export type Mutation = {
  __typename?: 'Mutation',
  addPet?: Maybe<Pet>,
  addOwner?: Maybe<Owner>,
};


export type MutationAddPetArgs = {
  pet: InputPet
};


export type MutationAddOwnerArgs = {
  owner: InputOwner
};

export type Owner = Entity & {
  __typename?: 'Owner',
  id: Scalars['ID'],
  name: Scalars['String'],
  pets: Array<Pet>,
};

export type Pet = Entity & {
  __typename?: 'Pet',
  id: Scalars['ID'],
  name: Scalars['String'],
  petType: Pettype,
  owner?: Maybe<Owner>,
};

export enum Pettype {
  Dog = 'DOG',
  Cat = 'CAT'
}

export type Query = {
  __typename?: 'Query',
  pets: Array<Pet>,
  pet?: Maybe<Pet>,
  owners: Array<Owner>,
  owner?: Maybe<Owner>,
};


export type QueryPetArgs = {
  id: Scalars['ID']
};


export type QueryOwnerArgs = {
  id: Scalars['ID']
};


export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>,
  Pet: ResolverTypeWrapper<any>,
  Entity: ResolverTypeWrapper<any>,
  ID: ResolverTypeWrapper<any>,
  String: ResolverTypeWrapper<any>,
  PETTYPE: ResolverTypeWrapper<any>,
  Owner: ResolverTypeWrapper<any>,
  Mutation: ResolverTypeWrapper<{}>,
  InputPet: ResolverTypeWrapper<any>,
  InputOwner: ResolverTypeWrapper<any>,
  Boolean: ResolverTypeWrapper<any>,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  Pet: any,
  Entity: any,
  ID: any,
  String: any,
  PETTYPE: any,
  Owner: any,
  Mutation: {},
  InputPet: any,
  InputOwner: any,
  Boolean: any,
};

export type EntityResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Entity'] = ResolversParentTypes['Entity']> = {
  __resolveType: TypeResolveFn<'Pet' | 'Owner', ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
};

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addPet?: Resolver<Maybe<ResolversTypes['Pet']>, ParentType, ContextType, RequireFields<MutationAddPetArgs, 'pet'>>,
  addOwner?: Resolver<Maybe<ResolversTypes['Owner']>, ParentType, ContextType, RequireFields<MutationAddOwnerArgs, 'owner'>>,
};

export type OwnerResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Owner'] = ResolversParentTypes['Owner']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  pets?: Resolver<Array<ResolversTypes['Pet']>, ParentType, ContextType>,
};

export type PetResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Pet'] = ResolversParentTypes['Pet']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  petType?: Resolver<ResolversTypes['PETTYPE'], ParentType, ContextType>,
  owner?: Resolver<Maybe<ResolversTypes['Owner']>, ParentType, ContextType>,
};

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  pets?: Resolver<Array<ResolversTypes['Pet']>, ParentType, ContextType>,
  pet?: Resolver<Maybe<ResolversTypes['Pet']>, ParentType, ContextType, RequireFields<QueryPetArgs, 'id'>>,
  owners?: Resolver<Array<ResolversTypes['Owner']>, ParentType, ContextType>,
  owner?: Resolver<Maybe<ResolversTypes['Owner']>, ParentType, ContextType, RequireFields<QueryOwnerArgs, 'id'>>,
};

export type Resolvers<ContextType = Context> = {
  Entity?: EntityResolvers,
  Mutation?: MutationResolvers<ContextType>,
  Owner?: OwnerResolvers<ContextType>,
  Pet?: PetResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = Context> = Resolvers<ContextType>;
// Generated in 2019-08-30T23:58:00+02:00
