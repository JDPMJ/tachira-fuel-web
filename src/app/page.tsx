"use client";
import { AuthContext } from "@/contexts/AuthContext";
import useAuthUser from "@/hooks/useAuthUser";
import { redirect } from "next/navigation";
import { useContext, useEffect } from "react";

export default function page() {
  useAuthUser();
  const {isLogget} = useContext(AuthContext);

  useEffect(() => {
    console.log("isLogget: ", isLogget);
  }, []);

  return (
    redirect("/home")
  );
}
