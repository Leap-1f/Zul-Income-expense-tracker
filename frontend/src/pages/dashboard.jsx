import { CashCard } from "@/components/dashboard/CashCard";
import { Navbar } from "@/components/layout/Navbar";
import { AddRecordPopUp } from "@/components/AddRecordPopUp";
import { AddCategoryPopUp } from "@/components/AddCategoryPopUp";
import { useState } from "react";
import { TotalBox } from "@/components/dashboard/TotalBox";
import { Dashboard } from "@/components/dashboard";
import { useRouter } from "next/router";
import { useEffect } from "react";
export default function Home() {
  const [showAddRecordPopUp, setShowAddRecordPopUp] = useState(false);
  const router = useRouter();

  useEffect(() => {
     const id = localStorage.getItem('id');
     if (id) {
       // If 'id' exists, redirect to the dashboard or home page
       router.push('/dashboard');
     } else {
       // If 'id' does not exist, redirect to the login page
       router.push('/');
     }
  }, []);
  return (
    <div className="relative w-full h-[100vh] bg-gray-100 ">
      <Navbar setShowAddRecordPopUp={setShowAddRecordPopUp} />
      <div className="max-w-screen-lg container m-auto h-[92vh]">
        <Dashboard />
      </div>
      {showAddRecordPopUp && (
        <AddRecordPopUp setShowAddRecordPopUp={setShowAddRecordPopUp} />
      )}
    </div>
  );
}
