import type { Metadata } from "next";
import "../../styles/globals.css";
import Providers from "./Providers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-transparent">
        <Providers>{children}</Providers>
        <ToastContainer
          position="top-center"
          theme="dark"
          autoClose={3000}
          hideProgressBar={true}

          className={"toast-container"}
        />
      </body>
    </html>
  );
}
