import Image from "next/image";
import { Inter } from "next/font/google";
import { LogIn } from "@/components/LogIn";
import { SignUp } from "@/components/SignUp";

// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      {/* <LogIn></LogIn> */}
      <SignUp></SignUp>
    </>
  );
}
