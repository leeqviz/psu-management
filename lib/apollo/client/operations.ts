import gql from "graphql-tag";

export const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      text
      completed
    }
  }
`;

export const ADD_TODO = gql`
  mutation AddTodo($text: String!) {
    addTodo(text: $text) {
      id
      text
      completed
    }
  }
`;

export const TOGGLE_TODO = gql`
  mutation ToggleTodo($id: ID!) {
    toggleTodo(id: $id) {
      id
      text
      completed
    }
  }
`;

export const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      id
    }
  }
`;

export const UPDATE_TODO_TEXT = gql`
  mutation UpdateTodoText($id: ID!, $text: String!) {
    updateTodoText(id: $id, text: $text) {
      id
      text
      completed
    }
  }
`;
