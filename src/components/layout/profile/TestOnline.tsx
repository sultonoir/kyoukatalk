"use client";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const TestOnline = () => {
  const router = useRouter();
  const { mutate, isPending } = api.chat.personalChat.useMutation({
    onSuccess: (e) => {
      router.push(`/chatpersonal/${e}`);
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });
  return (
    <Button
      variant="gooeyLeft"
      disabled={isPending}
      onClick={() => mutate({ receiverId: "ob8bkeb2ba" })}
    >
      Click me
    </Button>
  );
};

export default TestOnline;
