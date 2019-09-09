// https://github.com/graphql-boilerplates/typescript-graphql-server/issues/194

declare module '*.graphql' {
  const content: any
  export = content
}