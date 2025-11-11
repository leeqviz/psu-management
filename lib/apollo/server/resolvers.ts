import { users } from "@/mocks/user";

export const resolvers = {
  Query: {
    getUsers: () => users,
    getUserById: (_: any, args: any) =>
      users.find((user) => user.id === args.id),
  },
  Mutation: {
    createUser: (_: any, args: any) => {
      const { name, age, isMarried } = args;
      const newUser = { id: String(users.length + 1), name, age, isMarried };
      users.push(newUser);
      return newUser;
    },
  },
};
