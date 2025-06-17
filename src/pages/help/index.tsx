import Image from "next/image";

import Form from "./Form";

const Help = () => {
  return (
    <>
      <a
        href="#main-content"
        className="skip-link absolute left-[-999px] top-auto w-[1px] h-[1px] overflow-hidden bg-[#222] text-white p-2 z-[1000] transition-[left] duration-300 focus:left-0"
        onFocus={(e) => (e.currentTarget.style.left = "0")}
        onBlur={(e) => (e.currentTarget.style.left = "-999px")}
      >
        Skip to main content
      </a>
      <header className="bg-gradient-to-r from-[#1e3c72] to-[#2a5298] text-white py-8 px-4 text-center shadow-md">
        <Image
          src="/logo.webp"
          alt="Movies Help Center Logo"
          className="mx-auto mb-4 h-16 w-auto"
          width={64}
          height={64}
        />
        <nav className="flex justify-center gap-8 text-lg">
          <a href="/submit-request" className="underline text-white">
            Submit a request
          </a>
          <a href="/sign-in" className="underline text-white">
            Sign in
          </a>
          <a
            href="https://yourwebsite.com"
            className="underline text-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            Website
          </a>
        </nav>
      </header>

      <Form />
    </>
  );
};

export default Help;
