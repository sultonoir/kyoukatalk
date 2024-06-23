"use client";
import type * as z from "zod";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { authSchema } from "@/server/api/routers/user/user.input";
import { ArrowRightIcon } from "@radix-ui/react-icons";

const FormSignin = () => {
  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
    },
  });

  // mutate create user
  const createUser = api.user.createUser.useMutation({
    onSuccess: async (e) => {
      const newUser = await signIn("signin", {
        email: e.email,
        password: e.password,
        redirect: true,
        callbackUrl: "/",
      });
      if (!newUser?.ok) {
        return toast.error(newUser?.error);
      }
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });
  function onSubmit(values: z.infer<typeof authSchema>) {
    createUser.mutate({
      email: values.email,
      password: values.password,
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="name@example.com" {...field} />
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
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={createUser.isPending}
          isPending={createUser.isPending}
          isShow
          type="submit"
          className="w-full"
          iconPlacement="right"
          Icon={ArrowRightIcon}
        >
          Sign up with email
        </Button>
      </form>
    </Form>
  );
};

export default FormSignin;
