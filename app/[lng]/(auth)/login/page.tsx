"use client";

import { Button } from "@/components/ui/button";
import { APP_ROUTING } from "@/constants/routing";
import { useAuthStore } from "@/hooks/state-management";
import { addLocaleToPath, getLocaleFromPath } from "@/lib/i18n";
import { mockDb } from "@/mocks/in-memory-db";
import { addSearchParams } from "@/utils/string-mapper";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useActionState } from "react";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { logIn } = useAuthStore((state) => state);
  const router = useRouter();
  const callbackUrl =
    searchParams.get("callbackUrl") || APP_ROUTING.home.build();

  const locale = getLocaleFromPath(pathname);
  const registerPath = addLocaleToPath(APP_ROUTING.register.build(), locale);
  const finalHref = addSearchParams(registerPath, { callbackUrl });

  const handleSubmit = async (prevState: unknown, formData: FormData) => {
    // You can append the callbackUrl to the formData if needed,
    // or pass it as a separate argument if your action supports it.

    // Ideally, update your Server Action signature:
    //const userData = formDataToTypedObject<User>(formData);
    const data = Object.fromEntries(formData);
    const result = await logIn(data, pathname);
    if (!result.success) return result;

    console.log("Redirecting to:", callbackUrl);
    router.replace(callbackUrl);
  };
  console.log(mockDb);

  const [state, action, isPending] = useActionState(handleSubmit, null);

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      {/* ... inputs ... */}
      <h1 className="text-2xl font-bold mb-4">Log In</h1>

      {/* Global Error Message */}
      {state?.error && <p className="text-red-500 mb-4">{state.error}</p>}

      <form action={action} className="flex flex-col gap-4">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            name="login"
            type="email"
            className="w-full border p-2 rounded"
            required
          />
          {/* state?.error?.email && (
            <p className="text-red-500 text-sm">{state.error.email[0]}</p>
          ) */}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            name="password"
            type="password"
            className="w-full border p-2 rounded"
            required
          />
          {/* state?.error?.password && (
            <p className="text-red-500 text-sm">{state.error.password[0]}</p>
          ) */}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={isPending}
          className="bg-blue-600 text-white py-2 rounded disabled:opacity-50"
        >
          {isPending ? "Logging in..." : "Log In"}
        </Button>
      </form>

      <div className="mt-4 text-center">
        <Link
          href={finalHref}
          className="text-blue-500 text-sm hover:underline"
        >
          {`Don't have an account? Register`}
        </Link>
      </div>
    </div>
  );
}
