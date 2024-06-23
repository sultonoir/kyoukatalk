"use client";

import { useSession } from "next-auth/react";
import React from "react";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import ProfileImage from "../profile/ProfileImage";

const Profile = () => {
  const { data } = useSession();
  const router = useRouter();
  const { mutate } = api.chat.personalChat.useMutation({
    onSuccess: (e) => {
      router.push(`/chat/${e}`);
    },
  });
  return (
    <div
      className="flex items-center justify-between border-t px-4 py-2"
      onClick={() => mutate({ receiverId: "ob8bkeb2ba" })}
    >
      <div className="flex gap-2">
        <ProfileImage imageUrl={data?.user.image} />
        <div className="flex flex-col ">
          <h3 className="text-sm capitalize">{data?.user.name}</h3>
          <p className="text-sm capitalize text-muted-foreground">Online</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
