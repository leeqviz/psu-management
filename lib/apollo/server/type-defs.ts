import gql from "graphql-tag";
import "server-only";

export const typeDefs = gql`
  type Todo {
    id: ID!
    text: String!
    completed: Boolean!
  }

  type Query {
    todos: [Todo]
  }

  type Mutation {
    addTodo(text: String!): Todo
    toggleTodo(id: ID!): Todo
    deleteTodo(id: ID!): Todo
    updateTodoText(id: ID!, text: String!): Todo
  }
`;
