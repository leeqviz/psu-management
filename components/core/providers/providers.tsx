import { getCurrentUser } from "@/lib/auth/server";
import { ApolloClientProvider } from "./apollo-client-provider";
import { AuthStoreProvider } from "./auth-store-provider";
import { AuthStoreSynchronizer } from "./auth-store-synchronizer";
import { TranslationProvider } from "./translation-provider";

interface ProvidersProps {
  children: React.ReactNode;
  lng: string;
}

export async function Providers({ children, lng }: ProvidersProps) {
  const user = await getCurrentUser();
  return (
    <ApolloClientProvider>
      {/** for data retrieving */}
      <TranslationProvider lng={lng}>
        {/** for internationalization */}
        <AuthStoreProvider initialUser={user}>
          <AuthStoreSynchronizer />
          {children}
        </AuthStoreProvider>
      </TranslationProvider>
    </ApolloClientProvider>
  );
}
