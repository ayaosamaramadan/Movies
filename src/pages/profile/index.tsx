import { getSession } from "next-auth/react";
import useCurrentUser from "../../../hooks/useCurrentUser";
import { NextPageContext } from "next";

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
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        {user ? (
          <div className="tcard tcard-bordered p-4">
            <h2 className="text-xl font-semibold mb-2">
              Welcome, {user.name}!
            </h2>
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
