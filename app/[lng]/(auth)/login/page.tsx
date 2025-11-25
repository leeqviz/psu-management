"use client";

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/hooks/state-management";
import { userDataMock } from "@/mocks/user";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const { logIn } = useAuthStore((state) => state);
  const router = useRouter();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleSubmit = async (formData: FormData) => {
    // You can append the callbackUrl to the formData if needed,
    // or pass it as a separate argument if your action supports it.

    // Ideally, update your Server Action signature:
    //const userData = formDataToTypedObject<User>(formData);
    await logIn(userDataMock);
    // Then redirect client-side if needed
    console.log("Redirecting to:", callbackUrl);
    router.replace(callbackUrl);
  };

  return (
    <form action={handleSubmit}>
      {/* ... inputs ... */}
      <Button type="submit">Login</Button>
    </form>
  );
}
