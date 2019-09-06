import { ApolloError } from 'apollo-server-express';

export const throwIfUndefined = (obj: any, code: number, message: string) => {
  if (!obj) {
    throw new ApolloError(message, code.toString());
  }
}