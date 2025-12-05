"use client";

import { APP_ROUTING } from "@/constants/routing";
import { useAuthStore } from "@/hooks/state-management";
import { addLocaleToPath, getLocaleFromPath } from "@/lib/i18n";
import { appendQueryParams } from "@/utils/string-mapper";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useActionState } from "react";

export default function RegisterPage() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { register } = useAuthStore((state) => state);
  const router = useRouter();
  const callbackUrl = searchParams.get("callbackUrl") || APP_ROUTING.home.path;

  const locale = getLocaleFromPath(pathname);
  const loginPath = addLocaleToPath(APP_ROUTING.login.path, locale);
  const finalHref = appendQueryParams(loginPath, { callbackUrl });

  const handleSubmit = async (prevState: unknown, formData: FormData) => {
    // You can append the callbackUrl to the formData if needed,
    // or pass it as a separate argument if your action supports it.

    // Ideally, update your Server Action signature:
    //const userData = formDataToTypedObject<User>(formData);
    const data = Object.fromEntries(formData);
    const result = await register(data, pathname);
    if (!result.success) return result;

    console.log("Redirecting to:", callbackUrl);
    router.replace(callbackUrl);
  };

  const [state, action, isPending] = useActionState(handleSubmit, null);

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Register</h1>

      {/* Global Error Message */}
      {state?.error && <p className="text-red-500 mb-4">{state.error}</p>}

      <form action={action} className="flex flex-col gap-4">
        {/* FIO */}
        <div>
          <label className="block text-sm font-medium">FIO</label>
          <input name="fio" className="w-full border p-2 rounded" required />
          {/* state?.error?.name && <p className="text-red-500 text-sm">{state.error.name[0]}</p> */}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            name="login"
            type="email"
            className="w-full border p-2 rounded"
            required
          />
          {/* state?.error?.email && <p className="text-red-500 text-sm">{state.error.email[0]}</p> */}
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
          {/* state?.error?.password && <p className="text-red-500 text-sm">{state.error.password[0]}</p> */}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="bg-green-600 text-white py-2 rounded disabled:opacity-50"
        >
          {isPending ? "Creating Account..." : "Sign Up"}
        </button>
      </form>

      <div className="mt-4 text-center">
        <Link
          href={finalHref}
          className="text-blue-500 text-sm hover:underline"
        >
          Already have an account? Log In
        </Link>
      </div>
    </div>
  );
}
