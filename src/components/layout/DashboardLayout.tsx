import type { ReactNode } from "react";

import { useAuth } from "../../context/AuthContext";

import AdminSidebar from "./AdminSidebar";
import CustomerSidebar from "./CustomerSidebar";
import Topbar from "./Topbar";

interface Props {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: Props) {
  const { user } = useAuth();

  const role = user?.roles?.[0]?.name;

  return (
    <div className="flex h-screen bg-gray-100">

      {role === "Customer" ? (
        <CustomerSidebar />
      ) : (
        <AdminSidebar />
      )}

      <div className="flex flex-col flex-1">

        <Topbar />

        <main className="flex-1 overflow-auto p-8">
          {children}
        </main>

      </div>

    </div>
  );
}