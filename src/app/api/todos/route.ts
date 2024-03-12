import { NextResponse, NextRequest } from "next/server";
import {
  getTodos,
  newTodo,
  deleteTodo,
  updateCompleted,
} from "@/actions/todoActions";
import { Todo } from "@/types/Todo";

export async function GET() {
  const todos: Todo[] = await getTodos();
  return NextResponse.json({ todos });
}

export async function POST(req: NextRequest) {
  const json = await req.json();
  const newTodoObj: Todo = {
    title: json.title,
    text: json.text,
    completed: json.completed,
  };
  const newTodoRes = await newTodo(newTodoObj);

  if (!newTodoRes) {
    return NextResponse.error();
  }
  return NextResponse.json({ data: newTodoRes });
}

export async function DELETE(req: NextRequest) {
  const id = await req.json();
  const deleted = await deleteTodo(id);
  return NextResponse.json({ deleted });
}

export async function PATCH(req: NextRequest) {
  const json = await req.json();
  const updatedTodo = await updateCompleted(json.id, json.completed);
  if (!updatedTodo) {
    return NextResponse.error();
  }

  return NextResponse.json({ completed: json.completed });
}
