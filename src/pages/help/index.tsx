import Image from "next/image";

import Form from "./Form";
import Navbar from "@/components/Navbar";

const Help = () => {
  return (
    <>
      <div className="fixed z-20 mt-32">
        <Navbar />
      </div>

      <header className="relative bg-gradient-to-br from-[#1e3c72] via-[#2a5298] to-[#6dd5ed] text-white py-6 px-6 text-center shadow-2xl rounded-b-3xl mb-12">
        <div className="flex flex-col items-center">
          <Image
            src="/logo.webp"
            alt="Movies Help Center Logo"
            className="mb-3 rounded-full border-4 border-white shadow-xl"
            width={96}
            height={96}
          />
          <h1 className="text-base font-extrabold mb-1 drop-shadow-lg">
            Movies Help Center
          </h1>
          <p className="text-lg mb-3 opacity-90">How can we help you today?</p>
        </div>
        <nav className="z-[1000] flex flex-wrap justify-center gap-4 sm:gap-8 text-base sm:text-lg font-semibold">
          <a
            href="/submit-request"
            className="px-5 py-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-40 transition-all duration-200 text-gray-600 border border-white/30 shadow-md hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/60"
          >
            Submit a request
          </a>
          <a
            href="/sign-in"
            className="px-5 py-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-40 transition-all duration-200 text-gray-600 border border-white/30 shadow-md hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/60"
          >
            Sign in
          </a>
          <a
            href="https://yourwebsite.com"
            className="px-5 py-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-40 transition-all duration-200 text-gray-600 border border-white/30 shadow-md hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/60"
            target="_blank"
            rel="noopener noreferrer"
          >
            Website
          </a>
        </nav>
      </header>
      <main
        id="main-content"
        className="max-w-2xl mx-auto bg-[#1b04525e] bg-opacity-90 rounded-2xl shadow-xl p-10 mt-[-4rem] mb-16 relative"
      >
        <Form />
      </main>
    </>
  );
};

export default Help;
