"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";

const AdminPage = () => {
  const router = useRouter();
  const auth = useSelector((state) => state.auth.isAuthenticated);

//   useEffect(() => {
//     if (!auth) {
//       router.push("/login");
//     }
//   }, [router]);

  return (
    <div className="page-container">
      <h1 className="text-4xl font-bold mb-6">Admin Dashboard</h1>
      <p className="mb-6">Welcome to your Admin Dashboard!</p>
    </div>
  );
};

export default AdminPage;
