"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Homee from "@/pages/page";
import Navbar from "@/components/Navbar";
import Topnav from "@/components/TopNav";
import Profile from "@/pages/profile";

export default function Home() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Topnav/>
      <Navbar />
      <div className="flex ">
        <Homee />
        <div
          className="fixed right-0 top-0 h-[100vh] p-4 shadow-lg rounded-lg bg-[radial-gradient(circle,rgba(255,188,188,0.27)_0%,rgba(0,0,0,0)_100%)]"
        >
         <Profile/>
        </div>
      </div>
    </>
  );
}
