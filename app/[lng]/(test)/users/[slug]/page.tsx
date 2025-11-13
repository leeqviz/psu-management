import { UserProfile } from "@/components/core/for-testing/user-profile";

export default async function UserPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const userId = (await params).slug;
  return <UserProfile userId={userId} />;
}
