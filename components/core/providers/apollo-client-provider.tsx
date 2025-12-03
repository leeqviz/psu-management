"use client";
import { client } from "@/lib/apollo/client";
import { ApolloProvider } from "@apollo/client/react";

interface ApolloClientProviderProps {
  children: React.ReactNode;
}

export const ApolloClientProvider = ({
  children,
}: ApolloClientProviderProps) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
