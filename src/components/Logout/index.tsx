import { signOut } from "next-auth/react";
import { MdLogout } from "react-icons/md";

const Logout = () => {
  return (
    <>
      <button
        title="Logout"
        onClick={() => {
          signOut();
          console.log("Logged out");
        }}
        className="cursor-pointer fixed bottom-4 left-3 z-50 p-3 rounded-full bg-gradient-to-br from-purple-500 via-pink-400 to-yellow-300 shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-200 border-2 border-white/80"
        aria-label="Logout"
      >
        <MdLogout className="text-2xl text-white drop-shadow" />
      </button>
    </>
  );
};

export default Logout;
