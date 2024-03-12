import { CashCard } from "@/components/dashboard/CashCard";
import { Navbar } from "@/components/layout/Navbar";
import { useRouter } from "next/router";
import { useContext } from "react";
import { Context } from "@/components/utils/context";
import { AddCategoryModal } from "@/components/AddCategoryModal";

export default function Home() {
  const { push } = useRouter();
  const { showAddCategory} = useContext(Context);

  return (
    <div className="relative">
      <div>
        <Navbar />
        <CashCard />
      </div>

      {showAddCategory && (
        <AddCategoryModal/>
      )}
    </div>
  );
}
