import { getSession } from "next-auth/react";
import useCurrentUser from "../../../hooks/useCurrentUser";
import { NextPageContext } from "next";
import Image from "next/image";
import { PiDotsThreeOutlineFill } from "react-icons/pi";

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
      <div className="container mt-20 mx-auto p-4">
        <div className=" justify-between flex items-center gap-2 mb-4">
          <h1 className="text-2xl font-bold">My Profile</h1>
          <PiDotsThreeOutlineFill className="text-2xl" />
        </div>
        {user ? (
          <>
            <div className="flex items-center gap-6 tcard tcard-bordered p-4 mb-4">
              <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={user.image || "https://via.placeholder.com/150"}
                  alt="User Avatar"
                  width={96}
                  height={96}
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div>
                {user.name && (
                  <>
                    <h2 className="text-xl font-semibold">
                      {user.name.split(" ")[0]}
                    </h2>
                    <h2 className="font-semibold text-xl">
                      {user.name.split(" ").slice(1).join(" ")}
                    </h2>
                  </>
                )}
              </div>
            </div>
            <p>Email: {user.email}</p>

            <div className="mt-6 tcard tcard-bordered p-4">
              <h3 className="text-lg font-semibold mb-2">
                Additional Information
              </h3>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  <span className="font-medium">Joined:</span>
                  <span className="text-gray-700">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "N/A"}
                  </span>
                </li>
                <li>
                  <span className="font-medium">Role:</span>
                  <span className="text-blue-700">{user.role || "User"}</span>
                </li>
                <li>
                  <span className="font-medium">Status:</span>
                  <span
                    className={
                      user.emailVerified
                        ? "text-green-600 font-semibold"
                        : "text-yellow-600 font-semibold"
                    }
                  >
                    {user.emailVerified ? "Verified" : "Not Verified"}
                  </span>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <p className="text-red-500">You are not logged in.</p>
        )}
      </div>
    </>
  );
};

export default Profile;
