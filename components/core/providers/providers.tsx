import NextTopLoader from "nextjs-toploader";
import { Suspense } from "react";
import { ApolloClientProvider } from "./apollo-client-provider";
import { AuthStoreProvider } from "./auth-store-provider";
import { PathnameListener } from "./pathname-listener";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NextTopLoader
        color={"#0369a1"}
        shadow={"0 0 10px #0369a1, 0 0 5px #0369a1"}
      />
      <ApolloClientProvider>
        <AuthStoreProvider>
          <Suspense>
            <PathnameListener />
          </Suspense>
          {children}
        </AuthStoreProvider>
      </ApolloClientProvider>
    </>
  );
};
