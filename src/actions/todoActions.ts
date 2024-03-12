import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { Todo as TodoTable } from "@/db/schema";
import { Todo } from "@/types/Todo";

export const getTodos = async () => {
  const tds = await db.select().from(TodoTable);
  const Todos = tds.map((todo) => {
    return {
      id: todo.id,
      title: todo.title,
      text: todo.text,
      completed: todo.completed,
    };
  });
  return Todos;
};

export const newTodo = async (todo: Todo) => {
  try {
    const [newTodo] = await db.insert(TodoTable).values(todo).returning();
    return newTodo;
  } catch (error) {
    console.log(error);
  }
};

export const deleteTodo = async (id: number) => {
  try {
    const deleted = await db
      .delete(TodoTable)
      .where(eq(TodoTable.id, id))
      .execute();
    return deleted;
  } catch (error) {
    console.log(error);
  }
};

export const updateCompleted = async (id: number, completed: boolean) => {
  try {
    const updated = await db
      .update(TodoTable)
      .set({ completed })
      .where(eq(TodoTable.id, id))
      .execute();
    return updated;
  } catch (error) {
    console.log(error);
  }
};
