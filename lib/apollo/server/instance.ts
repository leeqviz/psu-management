import { ApolloServer } from "@apollo/server";
import "server-only";
import { resolvers } from "./resolvers";
import { typeDefs } from "./type-defs";

export const server = new ApolloServer({
  typeDefs,
  resolvers,
});
