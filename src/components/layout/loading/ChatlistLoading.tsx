import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  length?: number;
}

const ChatlistLoading = ({ className, length = 4 }: Props) => {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {Array.from({ length }).map((_, index) => (
        <div className="flex items-center space-x-4" key={index}>
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatlistLoading;
