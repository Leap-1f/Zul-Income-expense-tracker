import Image from "next/image";
import { Inter } from "next/font/google";
import { LogIn } from "@/components/login";
//  npx vercel --prod

// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <LogIn></LogIn>
    </>
  );
}
