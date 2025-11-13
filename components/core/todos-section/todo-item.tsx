// src/app/components/TodoItem.tsx
"use client";

import { updateTodo } from "@/lib/apollo/client/operations";
import { useMutation } from "@apollo/client/react";
import { useState } from "react";

// Define the shape of a Todo
interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

// Define the props for our component
interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void; // Function to toggle
  onDelete: (id: string) => void; // Function to delete
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  // 1. State for editing mode and the input's text
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  // 2. Define the update mutation
  // Notice: no refetchQueries! Apollo cache handles it.
  const [updateTodoText] = useMutation(updateTodo);

  // 3. Handle saving the edit
  const handleSave = () => {
    if (!editText.trim()) return;

    updateTodoText({
      variables: {
        id: todo.id,
        text: editText,
      },
    });
    setIsEditing(false); // Exit editing mode
  };

  // 4. Handle key presses (Enter to save, Escape to cancel)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setEditText(todo.text); // Reset text
    }
  };

  return (
    <li className="flex items-center justify-between p-3 bg-gray-100 rounded">
      {isEditing ? (
        // EDITING MODE
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleSave} // Save when user clicks away
          autoFocus // Automatically focus the input
          className="grow p-1 border rounded text-black mr-2"
        />
      ) : (
        // VIEW MODE
        <>
          <span
            onClick={() => onToggle(todo.id)}
            className={`cursor-pointer ${
              todo.completed ? "line-through text-gray-500" : "text-black"
            }`}
          >
            {todo.text}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="bg-red-500 text-white px-3 py-1 rounded text-sm"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  );
}
