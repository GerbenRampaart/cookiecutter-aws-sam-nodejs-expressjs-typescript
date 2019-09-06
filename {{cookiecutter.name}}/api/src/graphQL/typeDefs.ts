import { gql } from "apollo-server-core";

// Cheatsheet
// https://raw.githubusercontent.com/sogko/graphql-shorthand-notation-cheat-sheet/master/graphql-shorthand-notation-cheat-sheet.png

// TODO: maybe client-side ?
// https://github.com/FormidableLabs/graphql-typescript-blog/tree/with-auto-generated-types/server

export const typeDefs = gql(`
type Owner {
  id: ID!
  name: String!
  pets: [Pet!]!
}

input InputOwner {
  name: String!
  pets: [String!]
}

enum PetType {
  DOG, 
  CAT
}

type Pet {
  id: ID!
  name: String!,
  petType: PetType!
  fullName: String!
  owner: Owner
}

input InputPet {
  name: String!
  petType: PetType!
}

type Mutation {
  addPet(pet: InputPet!): Pet
  addOwner(owner: InputOwner!): Owner
}

enum PetOrder {
  NAME_ASC, NAME_DESC
}

enum OwnerOrder {
  NAME_ASC, NAME_DESC
}

union PetsByPage = PageInfo | [Pet!]!
union OwnersByPage = PageInfo | [Owner!]!

type Page {
  offset: Int = 0
  limit: Int = 10
}

type PageInfo {
  totalCount: number
}

enum PetOrderType {
  NAME_ASC, NAME_DESC
}

enum OwnerOrderType {
  NAME_ASC, NAME_DESC
}

type Query {
  pets: [Pet!]!
  owners: [Owner!]!
  pets(id: ID!): Pet
  owners(id: ID!): Owner
  petsByPage(page: Page, orderType: PetOrderType): PetsByPage
  ownersByPage(page: Page, orderType: OwnerOrderType): OwnersByPage
}
`);