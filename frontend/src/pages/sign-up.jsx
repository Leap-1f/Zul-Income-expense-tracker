import Image from "next/image";
import { Inter } from "next/font/google";
import { SignUp } from "@/components/SignUp";
//  npx vercel --prod

// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <SignUp></SignUp>
    </>
  );
}
