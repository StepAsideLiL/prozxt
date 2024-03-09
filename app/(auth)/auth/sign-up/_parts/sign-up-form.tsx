"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { createUser } from "./action";

const formSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, {
      message: "Username can not be empty.",
    })
    .max(31, { message: "Username can not be more than 31 characters long." })
    .refine((u) => /^[a-z0-9_-]+$/.test(u), {
      message: "Username can not contain special characters",
    }),
  password: z
    .string()
    .min(4, {
      message: "Password must be 4 characters long.",
    })
    .max(255, { message: "Password can not be 255 characters long." }),
  confirmPassword: z
    .string()
    .min(4, {
      message: "Password must be 4 characters long.",
    })
    .max(255, { message: "Password can not be 255 characters long." }),
});

export default function SignUpForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { username, password, confirmPassword } = values;

    if (password === confirmPassword) {
      const formData = {
        username,
        password,
      };

      const res = await createUser(formData);
      if (res?.error === "Invalid username.") {
        toast.error("Invalid username.");
      }
      if (res?.error === "Invalid password.") {
        toast.error("Invalid password.");
      }
    } else {
      toast.error("Passwords do not match.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="exmaple"
                  autoComplete="off"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Type your password"
                  autoComplete="off"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Re-type your password"
                  autoComplete="off"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Create an account</Button>
      </form>
    </Form>
  );
}
