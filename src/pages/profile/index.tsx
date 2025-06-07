import { getSession } from "next-auth/react";
import useCurrentUser from "../../../hooks/useCurrentUser";
import { NextPageContext } from "next";
import Image from "next/image";

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
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">My Profile</h1>
        {user ? (
          <div className="tcard tcard-bordered p-4">
            <div className="w-24 h-24 rounded-full mb-4 overflow-hidden">
              <Image
                src={user.image || "https://via.placeholder.com/150"}
                alt="User Avatar"
                width={96}
                height={96}
                style={{ objectFit: "cover" }}
              />
            </div>
            <h2 className="text-xl font-semibold mb-2">{user.name}</h2>
            <p>Email: {user.email}</p>
          </div>
        ) : (
          <p className="text-red-500">You are not logged in.</p>
        )}
      </div>
    </>
  );
};

export default Profile;
