import { getAuthUser } from "@/actions/cookies";
import NextTopLoader from "nextjs-toploader";
import { ApolloClientProvider } from "./apollo-client-provider";
import { AuthStoreInitializer } from "./auth-store-initializer";
import { AuthStoreProvider } from "./auth-store-provider";
import { PathnameListener } from "./pathname-listener";
import { TranslationProvider } from "./translation-provider";

export async function Providers({
  children,
  lng,
}: {
  children: React.ReactNode;
  lng: string;
}) {
  const user = await getAuthUser();

  return (
    <ApolloClientProvider>
      {/** for data retrieving */}
      <TranslationProvider lng={lng}>
        {/** for internationalization */}
        <AuthStoreProvider>
          {/** for authentication */}
          <AuthStoreInitializer user={user} />
          <NextTopLoader
            color={"#0369a1"}
            shadow={"0 0 10px #0369a1, 0 0 5px #0369a1"}
          />
          <PathnameListener />
          {children}
        </AuthStoreProvider>
      </TranslationProvider>
    </ApolloClientProvider>
  );
}
