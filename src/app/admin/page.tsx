"use client";
import EvidenceTable from "@/components/admin/EvidenceTable";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

export default function AdminDashboard() {
  useAuthRedirect();

  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard Admin</h1>
      <EvidenceTable />
    </main>
  );
}
