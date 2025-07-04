"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Homee from "@/pages/page";
import Navbar from "@/components/Navbar";
import Topnav from "@/components/TopNav";
import Profile from "@/pages/profile";
import Load from "@/components/spener";

export default function Home() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
     <Load />
    );
  }

  return (
    <>
      <div className="fixed z-20">
        <Navbar />
      </div>
      <Topnav />
      <div className="flex mt-32">
        <Homee />
        <div className="hidden md:fixed md:right-0 md:top-0 md:h-[100vh] md:p-4 md:shadow-lg md:rounded-lg md:bg-[radial-gradient(circle,rgba(255,188,188,0.27)_0%,rgba(0,0,0,0)_100%)] md:block">
          <Profile />
        </div>
      </div>
    </>
  );
}
