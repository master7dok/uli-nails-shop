import React from "react";
import { redirect } from "next/navigation";
import { checkAdminSession } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = await checkAdminSession();

  if (!isAuthenticated) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-nude-100/60 flex">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-y-auto max-h-screen">
        {children}
      </main>
    </div>
  );
}
