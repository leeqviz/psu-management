import "client-only";
import gql from "graphql-tag";

export const getTodos = gql`
  query GetTodos {
    todos {
      id
      text
      completed
    }
  }
`;

export const addTodo = gql`
  mutation AddTodo($text: String!) {
    addTodo(text: $text) {
      id
      text
      completed
    }
  }
`;

export const toggleTodo = gql`
  mutation ToggleTodo($id: ID!) {
    toggleTodo(id: $id) {
      id
      text
      completed
    }
  }
`;

export const deleteTodo = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      id
    }
  }
`;

export const updateTodo = gql`
  mutation UpdateTodoText($id: ID!, $text: String!) {
    updateTodoText(id: $id, text: $text) {
      id
      text
      completed
    }
  }
`;
