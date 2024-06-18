import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import React from "react";
import Profile from "../profile/Profile";
import { DialogCreateGroup } from "../group/DialogCreateGroup";

const MainNavbar = () => {
  return (
    <div className="flex w-[360px] flex-col justify-between bg-popover">
      <div className="flex items-center justify-between px-4 py-2">
        <h1 className="text-2xl">Chats</h1>
        <DialogCreateGroup />
      </div>
      <div className="relative mx-4 flex rounded-md border bg-accent">
        <div className="flex size-9 items-center justify-center">
          <MagnifyingGlassIcon className="size-5" />
        </div>
        <Input
          className="border-none p-0 focus-visible:ring-0"
          placeholder="search"
        />
      </div>
      <div className="w-full flex-1 flex-col overflow-y-auto transition-opacity duration-500">
        <div className="h-[500px]">w</div>
        <div className="h-[500px]">w</div>
        <div className="h-[500px]">w</div>
        <div className="h-[500px]">w</div>
      </div>
      <Profile />
    </div>
  );
};

export default MainNavbar;
