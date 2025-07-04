import { getSession } from "next-auth/react";
import useCurrentUser from "../../../hooks/useCurrentUser";
import { NextPageContext } from "next";
import Image from "next/image";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { MdAlternateEmail } from "react-icons/md";

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

const Profile = () => {
  const { currentUser: user } = useCurrentUser();

  return (
    <>
      <div className="container mt-20 mx-auto p-6 max-w-sm rounded-2xl shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            My Profile
          </h1>
          <button
            title="btn"
            className="p-2 rounded-full hover:bg-gray-700 transition"
          >
            <PiDotsThreeOutlineFill className="text-2xl text-gray-300" />
          </button>
        </div>
        {user ? (
          <>
            <div className="flex flex-col items-center gap-3 tcard tcard-bordered bg-[#0000000e] rounded-xl p-6 mb-6 shadow">
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-purple-500 shadow-lg mb-2">
                <Image
                  src={user.image || "https://via.placeholder.com/150"}
                  alt="User Avatar"
                  width={112}
                  height={112}
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="text-center">
                {user.name && (
                  <>
                    <h2 className="text-2xl font-bold text-white">
                      {user.name.split(" ")[0]}
                    </h2>
                    <h2 className="font-semibold text-lg text-gray-300">
                      {user.name.split(" ").slice(1).join(" ")}
                    </h2>
                  </>
                )}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <MdAlternateEmail className="text-blue-400" />
                <span className="text-gray-300 break-all text-sm">
                  {user.email}
                </span>
              </div>
            </div>
            <div className="mt-4 tcard tcard-bordered bg-[#0000000e] rounded-xl p-5 shadow">
              <h3 className="text-lg font-semibold mb-3 text-white">
                Additional Information
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="font-medium text-gray-400">Joined:</span>
                  <span className="text-gray-200">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "N/A"}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-medium text-gray-400">Role:</span>
                  <span className="text-blue-400">{user.role || "User"}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-medium text-gray-400">Status:</span>
                  <span
                    className={
                      user.emailVerified
                        ? "text-green-400 font-semibold"
                        : "text-yellow-400 font-semibold"
                    }
                  >
                    {user.emailVerified ? "Verified" : "Not Verified"}
                  </span>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <p className="text-red-500 text-center">You are not logged in.</p>
        )}
      </div>
    </>
  );
};

export default Profile;
