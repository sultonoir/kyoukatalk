import MainNavbar from "@/components/layout/navbar/MainNavbar";
import { Toaster } from "@/components/ui/sonner";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-dvh">
      <MainNavbar />
      {children}
      <Toaster richColors position="top-center" />
    </div>
  );
};

export default Layout;
