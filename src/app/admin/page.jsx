"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";

const AdminPage = () => {
  const router = useRouter();
  const auth = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    // const token = localStorage.getItem("token");
    if (!auth) {
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="container mx-auto px-4 my-8">
      {/* <div className="p-8 rounded-lg shadow-md w-96 text-center"> */}
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <p className="mb-6">Welcome to your Admin Dashboard!</p>
      <Button variant="outline" onClick={handleLogout}>
        Logout
      </Button>
      {/* </div> */}
    </div>
  );
};

export default AdminPage;
