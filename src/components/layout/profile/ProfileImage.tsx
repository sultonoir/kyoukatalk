import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  imageUrl: string | undefined | null;
};

const ProfileImage = ({ imageUrl }: Props) => {
  return (
    <div className="relative flex-shrink-0">
      <Avatar>
        <AvatarImage src={imageUrl ?? "/logo.png"} alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="absolute bottom-0 right-0 size-3 rounded-full border bg-green-500"></div>
    </div>
  );
};

export default ProfileImage;
