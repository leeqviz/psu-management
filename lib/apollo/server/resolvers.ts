import { todos } from "@/mocks/apollo";

export const resolvers = {
  Query: {
    todos: () => todos,
  },
  Mutation: {
    // Create a new todo
    addTodo: (_: unknown, { text }: { text: string }) => {
      const newTodo = {
        id: Date.now().toString(),
        text,
        completed: false,
      };
      todos.push(newTodo);
      return newTodo;
    },
    // Toggle a todo's completed status
    toggleTodo: (_: unknown, { id }: { id: string }) => {
      const todo = todos.find((t) => t.id === id);
      if (todo) {
        todo.completed = !todo.completed;
        return todo;
      }
      throw new Error("Todo not found");
    },
    // Delete a todo
    deleteTodo: (_: unknown, { id }: { id: string }) => {
      const index = todos.findIndex((t) => t.id === id);
      if (index > -1) {
        const [deletedTodo] = todos.splice(index, 1);
        return deletedTodo;
      }
      throw new Error("Todo not found");
    },
    updateTodoText: (
      _: unknown,
      { id, text }: { id: string; text: string }
    ) => {
      const todo = todos.find((t) => t.id === id);
      if (todo) {
        todo.text = text; // Update the text
        return todo;
      }
      throw new Error("Todo not found");
    },
  },
};
