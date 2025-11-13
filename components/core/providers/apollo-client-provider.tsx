"use client";
import { client } from "@/lib/apollo/client/instance";
import { ApolloProvider } from "@apollo/client/react";

export const ApolloClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
