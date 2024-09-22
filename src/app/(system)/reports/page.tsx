"use client";
import ReportTable from "@/components/ReportTable";
import useAuthUser from "@/hooks/useAuthUser";

export default function ProductsPage() {
  useAuthUser();
  
  return (
    <ReportTable />
  )
}
