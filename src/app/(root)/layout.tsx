import MainNavbar from "@/components/layout/navbar/MainNavbar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-dvh">
      <MainNavbar />
      {children}
    </div>
  );
};

export default Layout;
