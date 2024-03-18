import { Navbar } from "@/components/layout/Navbar";
import { AddRecordPopUp } from "@/components/AddRecordPopUp";
import { AddCategoryPopUp } from "@/components/AddCategoryPopUp";
import { useState } from "react";
import { Record } from "@/components/record";

export default function Home() {
  const [showAddRecordPopUp, setShowAddRecordPopUp] = useState(false);



  return (
    <div>
      <div className="">
        <Navbar setShowAddRecordPopUp={setShowAddRecordPopUp} />
        <Record/>
      </div>
      {showAddRecordPopUp && (
        <AddRecordPopUp setShowAddRecordPopUp={setShowAddRecordPopUp} />
      )}
    </div>
  );
}
