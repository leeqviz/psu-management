// Define the shape of your User

import { User } from "@/types/access-control";
import { userDataMock } from "./user";

// Global container to persist data during development hot-reloads
//const globalForMock = global as unknown as { mockUsers: User[] };

export const mockDb = {
  users: [userDataMock],

  getUserById: async (id: string): Promise<User | undefined> => {
    // Simulate DB delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockDb.users.find((u) => u.id === id);
  },

  // Method 1: Find by login and password
  getUserByCredentials: async (credentials: {
    login: string;
    password: string;
  }): Promise<User | undefined> => {
    // Simulate DB delay
    const { login, password } = credentials;
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockDb.users.find(
      (u) => u.login === login && u.password === password
    );
  },

  // Method 2: Create User
  createUser: async (user: Omit<User, "id">): Promise<User> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const newUser = { ...user, id: Date.now().toString() };
    mockDb.users.push(newUser);
    return newUser;
  },
};

// Save to global scope
//if (process.env.NODE_ENV !== "production")
//globalForMock.mockUsers = mockDb.users;
