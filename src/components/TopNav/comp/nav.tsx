import Searchmovie from "@/components/Searchmovie";
import { signOut } from "next-auth/react";
const Nav = () => {
    return ( <>
 <button
          onClick={() => {
            signOut();
            console.log("Logged out");
          }}
        >
          Logout
        </button>
          <Searchmovie /></> );
}
 
export default Nav;