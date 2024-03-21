import { Navbar } from "@/components/layout/Navbar";
import { AddRecordPopUp } from "@/components/AddRecordPopUp";
import { AddCategoryPopUp } from "@/components/AddCategoryPopUp";
import { useState } from "react";
import { Record } from "@/components/record";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const [showAddRecordPopUp, setShowAddRecordPopUp] = useState(false);

  const router = useRouter();

  useEffect(() => {
     const id = localStorage.getItem('id');
     if (id) {
       router.push('/record');
     } else {
       router.push('/');
     }
  }, []);

  return (
    <div>
      <div className="">
        <Navbar setShowAddRecordPopUp={setShowAddRecordPopUp} />
        <Record setShowAddRecordPopUp={setShowAddRecordPopUp}/>
      </div>
      {showAddRecordPopUp && (
        <AddRecordPopUp setShowAddRecordPopUp={setShowAddRecordPopUp} />
      )}
    </div>
  );
}
