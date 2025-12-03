import { getCurrentUser } from "@/lib/auth/server";
import { notFound } from "next/navigation";

export default async function StudentsPage() {
  // Check user actual data
  const user = await getCurrentUser();

  if (!user) return notFound();
  return <h1>Students</h1>;
}
