"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { RotateCcw } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "name can not be empty.",
  }),
  showProfessionalStatus: z.boolean().default(false),
  professionalStatus: z.string().optional(),
});

const professionalStatusList = ["Free to Work", "Available", "Hiring"];

export default function UserProfileInfoForm() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      showProfessionalStatus: false,
      professionalStatus: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <section className="mx-auto max-w-3xl space-y-3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="professionalStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Professional Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your professional status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {professionalStatusList.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Select your professional status
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="showProfessionalStatus"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Show your professional status on your profile.
                  </FormLabel>
                  <FormDescription>
                    Let the hirers know about your professional status.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />

          {isLoading ? (
            <Button>
              <RotateCcw className="mr-2 h-4 w-4 animate-spin" /> Saving...
            </Button>
          ) : (
            <Button type="submit">Save</Button>
          )}
        </form>
      </Form>
    </section>
  );
}
