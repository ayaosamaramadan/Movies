
import Allmovie from "@/components/Allmovie";
import Searchmovie from "@/components/Searchmovie";
import { signOut } from "next-auth/react";

const Homee = () => {
    return ( <>
     <button
      onClick={() => {
        signOut();
         console.log("Logged out");
      }}
      
    >
      Logout
    </button>
      <Searchmovie/>
    <Allmovie />
    </> );
}
 
export default Homee;