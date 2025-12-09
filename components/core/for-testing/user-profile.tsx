// A hypothetical service module to fetch data
"use client";
import { fetchUserData } from "@/services/users";
import { User } from "@/types/access-control";
import { useEffect, useState } from "react";
import { UserInfo } from "./user-info";

export function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData(userId) // This is the function we need to mock
      .then((data) => {
        setUser(data);
      })
      .catch(() => {
        //console.error("Fetch failed:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userId]);

  if (loading) {
    return <div>Loading user data...</div>;
  }

  if (!user) {
    return <div>User not found.</div>;
  }

  return (
    <div data-testid="user-profile">
      <h2>{user.fio}</h2>
      <p>Email: {user.email}</p>
      <UserInfo user={user} />
    </div>
  );
}
