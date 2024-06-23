"use client";
import { type User, type PersonalChat } from "@prisma/client";
import { useSession } from "next-auth/react";
import React from "react";
import ProfileImage from "../../profile/ProfileImage";

interface Props {
  personal?:
    | (PersonalChat & {
        sender?: User;
        receiver?: User;
      })
    | null;
}

const PersonalChat = ({ personal }: Props) => {
  const { data: current } = useSession();
  const newUser =
    current?.user.id === personal?.senderId
      ? personal?.receiver
      : personal?.sender;

  return (
    <div className="flex items-center space-x-4">
      <ProfileImage imageUrl={newUser?.image} />
      <h3 className="text-sm capitalize">{newUser?.name}</h3>
      <p className="text-sm capitalize text-muted-foreground">Online</p>
    </div>
  );
};

export default PersonalChat;
