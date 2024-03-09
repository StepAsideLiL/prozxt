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
import { signInUser } from "./actions";
import { toast } from "sonner";
import { useState } from "react";
import { RotateCw } from "lucide-react";

const formSchema = z.object({
  username: z.string().min(1, {
    message: "Username can not be empty.",
  }),
  password: z.string().min(1, {
    message: "Password can not be empty.",
  }),
});

export default function SignInForm() {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    const res = await signInUser(values);
    if (res?.error === "Invalid username") {
      toast.error("Invalid username");
      setLoading(false);
    }
    if (res?.error === "Invalid password") {
      toast.error("Invalid password");
      setLoading(false);
    }
    if (res?.error === "Incorrect username or password") {
      toast.error("Incorrect username or password");
      setLoading(false);
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
                  placeholder="Username"
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
                  placeholder="Password"
                  autoComplete="off"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {!loading ? (
          <Button type="submit">Sign In</Button>
        ) : (
          <Button disabled>
            <RotateCw className="mr-2 h-4 w-4 animate-spin" />
            Signing in
          </Button>
        )}
      </form>
    </Form>
  );
}
