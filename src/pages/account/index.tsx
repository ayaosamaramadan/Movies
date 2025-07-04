import { getSession } from "next-auth/react";
import useCurrentUser from "../../../hooks/useCurrentUser";
import { NextPageContext } from "next";
import Image from "next/image";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { MdAlternateEmail } from "react-icons/md";
import Navbar from "@/components/Navbar";
import Topnav from "@/components/TopNav";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

const Account = () => {
  const { currentUser: user } = useCurrentUser();

  return (
    <>
      <div className="fixed mt-32 z-20">
        <Navbar />
      </div>
      <Topnav />
    <div className="fixed mx-26 mt-10 inset-0 flex flex-col items-center justify-center py-12 px-4 min-h-screen">
      <div className="w-full rounded-2xl shadow-2xl p-8 relative">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white tracking-tight">My Account</h1>
          <PiDotsThreeOutlineFill className="text-2xl text-gray-400" />
        </div>
        {user ? (
          <>
            <div className="flex flex-col items-center mb-6">
              <div className="relative w-24 h-24 mb-4">
                <Image
                  src={user.image || "https://via.placeholder.com/150"}
                  alt="User Avatar"
                  width={96}
                  height={96}
                  className="rounded-full border-4 border-gray-400 shadow-lg object-cover"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="text-center">
                {user.name && (
                  <>
                    <h2 className="text-xl font-semibold text-white">
                      {user.name.split(" ")[0]}
                    </h2>
                    <h2 className="text-lg text-gray-400">
                      {user.name.split(" ").slice(1).join(" ")}
                    </h2>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 mb-8">
              <span className="text-gray-400 text-xl"><MdAlternateEmail /></span>
              <span className="text-gray-200 text-base">{user.email}</span>
            </div>
            <div className="bg-[#99929254] rounded-xl p-6 shadow-inner">
              <h3 className="text-lg font-semibold text-white mb-4">
                Additional Information
              </h3>
              <ul className="space-y-3">
                <li className="flex justify-between text-gray-300">
                  <span className="font-medium">Joined:</span>
                  <span>
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "N/A"}
                  </span>
                </li>
                <li className="flex justify-between text-gray-300">
                  <span className="font-medium">Role:</span>
                  <span>{user.role || "User"}</span>
                </li>
                <li className="flex justify-between text-gray-300">
                  <span className="font-medium">Status:</span>
                  <span>
                    {user.emailVerified ? "Verified" : "Not Verified"}
                  </span>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-400">You are not logged in.</p>
        )}
      </div>
    </div>
    </>
  );
};

export default Account;
