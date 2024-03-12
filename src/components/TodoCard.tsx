"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import Link from "next/link";
import { cn } from "@/lib/utils";

import { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { z } from "zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { XIcon } from "lucide-react";

import { Todo } from "@/types/Todo";

const formSchema = z.object({
  completed: z.boolean(),
});

export function TodoCard({
  todo,
  className,
  onCheckboxChange,
  onDelete,
}: {
  todo: Todo;
  className: React.HTMLAttributes<HTMLDivElement>["className"];
  onCheckboxChange: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      completed: todo.completed,
    },
  });

  return (
    isMounted && (
      <Form {...form} key={todo.id}>
        <form className={cn("space-y-8", className)}>
          <FormField
            control={form.control}
            name="completed"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <FormDescription>
                    <Card>
                      <CardHeader>
                        <CardTitle
                          className={cn(
                            "text-lg font-bold flex justify-between items-center",
                            field.value ? "line-through" : ""
                          )}
                        >
                          <div>{todo.title}</div>
                          <Link
                            onClick={() => {
                              // check if todo.id is not undefined

                              if (todo.id !== undefined) {
                                onDelete(todo.id);
                              }
                            }}
                            href="#"
                            className="cursor-pointer w-6 h-6 text-gray-500  transition-colors duration-200 ease-in-out rounded-md hover:bg-gray-100 "
                          >
                            {todo.id !== 0 && <XIcon className="w-6 h-6" />}
                          </Link>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex justify-between items-center w-full">
                        {todo.id !== 0 && (
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={() => {
                              form.setValue(
                                "completed",
                                field.value ? false : true
                              );
                              if (todo.id !== undefined) {
                                onCheckboxChange(todo.id, field.value);
                              }
                            }}
                          />
                        )}
                        <CardDescription
                          className={cn(
                            "ml-4 w-full",
                            field.value ? "line-through" : ""
                          )}
                        >
                          {todo.text}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </FormDescription>
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    )
  );
}
