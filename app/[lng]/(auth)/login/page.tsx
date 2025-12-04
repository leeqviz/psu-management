"use client";

import { Button } from "@/components/ui/button";
import { routingManifest } from "@/constants/routing";
import { useAuthStore } from "@/hooks/state-management";
import { userDataMock } from "@/mocks/user";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { logIn } = useAuthStore((state) => state);
  const router = useRouter();
  const callbackUrl =
    searchParams.get("callbackUrl") || routingManifest.public.home;

  const handleSubmit = async (formData: FormData) => {
    // You can append the callbackUrl to the formData if needed,
    // or pass it as a separate argument if your action supports it.

    // Ideally, update your Server Action signature:
    //const userData = formDataToTypedObject<User>(formData);
    await logIn(userDataMock, pathname);
    // Then redirect client-side if needed
    router.replace(callbackUrl);
  };

  return (
    <form action={handleSubmit}>
      {/* ... inputs ... */}
      <Button type="submit">Login</Button>
    </form>
  );
}
