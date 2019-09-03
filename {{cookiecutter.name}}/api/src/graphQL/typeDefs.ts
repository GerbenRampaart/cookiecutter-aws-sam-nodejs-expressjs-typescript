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

enum PETTYPE {
  DOG, 
  CAT
}

type Pet {
  id: ID!
  name: String!,
  petType: PETTYPE!
  fullName: String!
  owner: Owner
}

input InputPet {
  name: String!
  petType: PETTYPE!
}

type Mutation {
  addPet(pet: InputPet!): Pet
  addOwner(owner: InputOwner!): Owner
}

type Query {
  pets: [Pet!]!
  owners: [Owner!]!
}
`);