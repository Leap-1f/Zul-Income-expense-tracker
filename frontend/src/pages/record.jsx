import { Navbar } from "@/components/layout/Navbar";
import { AddRecordPopUp } from "@/components/AddRecordPopUp";
import { AddCategoryPopUp } from "@/components/AddCategoryPopUp";
import { useState } from "react";

export default function Home() {
     const [showAddRecordPopUp, setShowAddRecordPopUp] = useState(false);
  
  return (
    <div>
      <div>
        <Navbar setShowAddRecordPopUp={setShowAddRecordPopUp} />
        <p>hi record?</p>{" "}
      </div>
      {showAddRecordPopUp && (
        <AddRecordPopUp
          setShowAddRecordPopUp={setShowAddRecordPopUp}
        />

      )}
    </div>
  );
}
