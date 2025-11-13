// src/app/page.tsx
"use client";

import {
  addTodo,
  deleteTodo,
  getTodos,
  toggleTodo,
} from "@/lib/apollo/client/operations";
import { useMutation, useQuery } from "@apollo/client/react";
import { useState } from "react";
import { TodoItem } from "./todo-item";

// Define the shape of a Todo
interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export function TodoList() {
  const [inputText, setInputText] = useState("");

  // 1. Fetch Todos (unchanged)
  const { loading, error, data } = useQuery<{ todos: Todo[] }>(getTodos);

  // 2. Define Mutations (unchanged)
  // We keep toggle and delete here because they refetch the *entire* list
  const [addTodoMutation] = useMutation(addTodo, {
    refetchQueries: [{ query: getTodos }],
  });

  const [toggleTodoMutation] = useMutation(toggleTodo, {
    // We *could* use cache update here too, but refetch is simpler for now
    refetchQueries: [{ query: getTodos }],
  });

  const [deleteTodoMutation] = useMutation(deleteTodo, {
    refetchQueries: [{ query: getTodos }],
  });

  // 3. Handle Form Submission (unchanged)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    addTodoMutation({ variables: { text: inputText } });
    setInputText("");
  };

  // 4. Create handler functions to pass down
  const handleToggle = (id: string) => {
    toggleTodoMutation({ variables: { id } });
  };

  const handleDelete = (id: string) => {
    deleteTodoMutation({ variables: { id } });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // 5. Render the UI (Updated)
  return (
    <main className="max-w-xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">GraphQL Todo App</h1>

      {/* Add Todo Form (unchanged) */}
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="What needs to be done?"
          className="grow p-2 border rounded text-black"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </form>

      {/* Todo List (Updated to use TodoItem) */}
      <ul className="space-y-2">
        {data?.todos.map((todo: Todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </main>
  );
}
