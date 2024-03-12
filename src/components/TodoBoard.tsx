"use client";

import { TodoCard } from "@/components/TodoCard";
import { TodoInput } from "@/components/TodoInput";
import { Todo } from "@/types/Todo";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { getTodos } from "@/actions/todoActions";
import { useEffect, useState } from "react";

export default function TodoBoard() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("/api/todos");
        const data = await response.json();
        setTodos(data.todos);
      } catch (error) {
        console.error("Error fetching todos", error);
      }
    };

    fetchTodos();
  }, []);

  const onDelete = (id: number) => {
    fetch("/api/todos", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id),
    })
      .then((response) => response.json())
      .then((data) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting todo", error);
      });
  };

  const onCheckboxChange = async (id: number, completed: boolean) => {
    fetch("/api/todos", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        completed: !completed,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTodos((prev) =>
          prev.map((todo) => {
            if (todo.id === id) {
              todo.completed = data.completed;
            }
            return todo;
          })
        );
      })
      .catch((error) => {
        console.error("Error updating todo", error);
      });
  };

  const onAdd = (data: { title: string; text: string }) => {
    fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: data.title,
        text: data.text,
        completed: false,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setTodos((prev) => [...prev, data.data]);
      })
      .catch((error) => {
        console.error("Error adding todo", error);
      });
  };

  return (
    <div className="flex flex-col items-center justify-start p-6 w-full">
      <ScrollArea className="h-[55vh] p-4 rounded-md border w-full">
        {todos.map((todo) => (
          <TodoCard
            key={todo.id}
            todo={todo}
            onDelete={onDelete}
            onCheckboxChange={onCheckboxChange}
            className="mb-4"
          />
        ))}
        <ScrollBar />
      </ScrollArea>
      <TodoInput className="m-8" onSubmit={onAdd} />
    </div>
  );
}
