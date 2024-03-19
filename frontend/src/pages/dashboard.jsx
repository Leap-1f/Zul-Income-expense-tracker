import { CashCard } from "@/components/dashboard/CashCard";
import { Navbar } from "@/components/layout/Navbar";
import { AddRecordPopUp } from "@/components/AddRecordPopUp";
import { AddCategoryPopUp } from "@/components/AddCategoryPopUp";
import { useState } from "react";
import { TotalBox } from "@/components/dashboard/TotalBox";
import { Dashboard } from "@/components/dashboard";
export default function Home() {
  const [showAddRecordPopUp, setShowAddRecordPopUp] = useState(false);

  return (
    <div className="relative w-full h-[100vh] bg-gray-100 ">
      <Navbar setShowAddRecordPopUp={setShowAddRecordPopUp} />
      <div className="max-w-screen-xl container m-auto py-8">
        <Dashboard />
      </div>
      {showAddRecordPopUp && (
        <AddRecordPopUp setShowAddRecordPopUp={setShowAddRecordPopUp} />
      )}
    </div>
  );
}
