import { getCurrentUser } from "@/lib/auth";
import { ApolloClientProvider } from "./apollo-client-provider";
import { AuthStoreProvider } from "./auth-store-provider";
import { AuthStoreSynchronizer } from "./auth-store-synchronizer";
import { TranslationProvider } from "./translation-provider";

export async function Providers({
  children,
  lng,
}: {
  children: React.ReactNode;
  lng: string;
}) {
  const user = await getCurrentUser();
  return (
    <ApolloClientProvider>
      {/** for data retrieving */}
      <TranslationProvider lng={lng}>
        {/** for internationalization */}
        <AuthStoreProvider>
          <AuthStoreSynchronizer user={user} />
          {children}
        </AuthStoreProvider>
      </TranslationProvider>
    </ApolloClientProvider>
  );
}
