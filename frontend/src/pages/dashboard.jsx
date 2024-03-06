import { CashCard } from "@/components/dashboard/CashCard";
import { useRouter } from "next/router";

export default function Home() {
  const { push } = useRouter();

  return <div>hello dashboard
    <CashCard/>
  </div>;
}
