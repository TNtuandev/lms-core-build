import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import '@smastrom/react-rating/style.css'
import QueryProvider from "@/context/QueryBuilder";
import { AuthProvider } from "@/context/AuthProvider";

export const metadata: Metadata = {
  title: "E-learning",
  description: "Learning Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <QueryProvider>
          <AuthProvider>{children}</AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
