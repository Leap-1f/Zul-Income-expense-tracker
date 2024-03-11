import { CashCard } from "@/components/dashboard/CashCard";
import { Navbar } from "@/components/layout/Navbar";
import { useRouter } from "next/router";

export default function Home() {
  const { push } = useRouter();

  return (
    <div>
      <Navbar />
      <CashCard />
    </div>
  );
}
