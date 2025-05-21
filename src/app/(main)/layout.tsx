import Navbar from "@/components/layout/navbar/NavBar";
import React, { PropsWithChildren } from "react";
import Footer from "@/components/layout/Footer";

function MainLayout({ children }: PropsWithChildren) {
  return <>
    <Navbar />
      <main className="flex-1 md:max-w-3xl max-w-sm lg:max-w-5xl xl:max-w-7xl mx-auto w-full">{children}</main>
    <Footer />
  </>;
}

export default MainLayout;
