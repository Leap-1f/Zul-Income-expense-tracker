import { CashCard } from "@/components/dashboard/CashCard";
import { Navbar } from "@/components/layout/Navbar";
import { AddRecordPopUp } from "@/components/AddRecordPopUp";
import { AddCategoryPopUp } from "@/components/AddCategoryPopUp";
import { useState } from "react";
export default function Home() {
  const [showAddRecordPopUp, setShowAddRecordPopUp] = useState(false);

  return (
    <div className="relative w-full h-full">
      <div>
        <Navbar setShowAddRecordPopUp={setShowAddRecordPopUp} />
        <CashCard />
      </div>
      {showAddRecordPopUp && (
        <AddRecordPopUp
          setShowAddRecordPopUp={setShowAddRecordPopUp}
        />

      )}

    </div>
  );
}
