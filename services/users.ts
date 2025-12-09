import { User } from "@/types/access-control";

// apiService.js (Real implementation - NOT used in the test)
export const fetchUserData = async (userId: string): Promise<User> => {
  // In a real app, this would be a fetch() or axios.get() call
  const response = await fetch(`/api/users/${userId}`);
  return response.json();
};
