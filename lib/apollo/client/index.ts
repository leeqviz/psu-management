import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import "client-only";

export const client = new ApolloClient({
  link: new HttpLink({
    uri: "/api/graphql",
    //credentials: "same-origin",
  }),
  cache: new InMemoryCache(),
});
