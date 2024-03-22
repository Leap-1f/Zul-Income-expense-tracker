import Image from "next/image";
import { Inter } from "next/font/google";
import { LogIn } from "@/components/login";
import { useEffect } from "react";
import { useRouter } from "next/router";
//  npx vercel --prod

// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter()
  useEffect(() => {
    const id = localStorage.getItem("id");
    if (id) {
      router.push("/dashboard");
    } else {
      router.push("/");
    }
  }, []);
  return (
    <>
      <LogIn></LogIn>
    </>
  );
}
