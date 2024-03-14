import { CashCard } from "@/components/dashboard/CashCard";
import { Navbar } from "@/components/layout/Navbar";
import { useContext } from "react";
import { Context } from "@/components/utils/context";
import { AddCategoryModal } from "@/components/AddCategoryModal";
import { AddRecordPopUp } from "@/components/AddRecordPopUp";
import { AddCategoryPopUp } from "@/components/AddCategoryPopUp";
import { useState } from "react";
export default function Home() {
  // const { showAddCategory } = useContext(Context);
  const [showAddRecordModal, setShowAddRecordModal] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);

  return (
    <div className="relative w-full h-full">
      <div>
        <Navbar setShowAddRecordModal={setShowAddRecordModal} />
        <CashCard />
      </div>
      {showAddRecordModal && (
        <div className="fixed inset-0 flex items-center justify-center z-1">
          <div className="bg-white p-4 rounded-2xl shadow-lg">
            <AddRecordPopUp
              setShowAddRecordModal={setShowAddRecordModal}
              setShowAddCategory={setShowAddCategory}
            />
          </div>
        </div>
      )}
      {showAddCategory && (
        <AddCategoryPopUp
          setShowAddRecordModal={setShowAddRecordModal}
          setShowAddCategory={setShowAddCategory}
        />
      )}
    </div>
  );
}
