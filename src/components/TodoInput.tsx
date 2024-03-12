"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { cn } from "@/lib/utils";

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
    })
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be at most 100 characters"),

  text: z
    .string({
      required_error: "Message is required",
    })
    .min(3, "Message must be at least 3 characters")
    .max(1000, "Message must be at most 1000 characters"),
});

export function TodoInput({
  className,
  onSubmit,
}: {
  className: React.HTMLAttributes<HTMLDivElement>["className"];
  onSubmit: (data: { title: string; text: string }) => void;
}) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm({
    defaultValues: {
      title: "",
      text: "",
    },
    resolver: zodResolver(formSchema),
  });

  const { handleSubmit, formState } = form;

  return (
    isMounted && (
      <Form {...form}>
        <div className={cn("gap-2 w-full h-full", className)}>
          <FormItem>
            <FormLabel htmlFor="title">Title</FormLabel>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => {
                return <Input {...field} />;
              }}
            />
          </FormItem>
          <FormMessage className="mt-2">
            {formState.errors.title?.message}
          </FormMessage>

          <div>
            <FormItem className="my-2">
              <FormField
                control={form.control}
                name="text"
                render={({ field }) => {
                  return (
                    <div>
                      <Label htmlFor="message">Your message</Label>
                      <Textarea {...field} id="message" />
                    </div>
                  );
                }}
              />
            </FormItem>
            <FormMessage>{formState.errors.text?.message}</FormMessage>
            <FormControl className="w-full mt-2">
              <Button
                type="submit"
                variant={"outline"}
                onClick={handleSubmit(
                  (data) => {
                    onSubmit(data);
                    form.reset();
                  },
                  (errors) => {}
                )}
              >
                Add Todo
              </Button>
            </FormControl>
          </div>
        </div>
      </Form>
    )
  );
}
