"use client";
// import Image from "next/image";
import Link from "next/link";
import { IoMdPerson } from "react-icons/io";
import { IoHome } from "react-icons/io5";
import { MdMail, MdWatchLater } from "react-icons/md";
import { FaMessage } from "react-icons/fa6";
import { GiTentacleHeart } from "react-icons/gi";

const Nav = () => {
  return (
    <>
      <header className="rounded-br-4xl rounded-tr-4xl fixed pt-15 mt-20 bg-[#7f00d4] opacity-90 w-auto hover:w-[250px] duration-300 ease-in-out z-10 sm:w-[80px] sm:hover:w-[250px]">
        <div>
          <ul>
            <li>
              <div className="ml-1 p-5 flex-col items-center">
                <Link href="/">
                  <IoHome className="text-white mb-10 mt-[-10px] text-2xl hover:text-yellow-400 transition-colors duration-300" />
                </Link>

                <Link href="/favorite">
                  <GiTentacleHeart className="text-white mb-10 text-2xl hover:text-yellow-400 transition-colors duration-300" />
                </Link>

                <Link href="/section5">
                  <MdWatchLater className="text-white mb-10 text-2xl hover:text-yellow-400 transition-colors duration-300" />
                </Link>
                
                <Link href="/section3">
                  <IoMdPerson className="text-white mb-10 text-2xl hover:text-yellow-400 transition-colors duration-300" />
                </Link>

                <Link href="/section4">
                  <MdMail className="text-white mb-10 text-2xl hover:text-yellow-400 transition-colors duration-300" />
                </Link>

                <Link href="/section6">
                  <FaMessage className="text-white mb-10 text-2xl hover:text-yellow-400 transition-colors duration-300" />
                </Link>
              </div>
            </li>
            <li>
              <ul className="flex flex-col justify-center items-center absolute top-5 left-0 w-full h-full text-white opacity-0 hover:opacity-100 transition-opacity duration-300 bg-opacity-50">
                <Link href="/">
                  <li className="cursor-pointer mb-10 mt-[-19px] hover:text-yellow-400 transition-transform duration-300">
                    Home
                  </li>
                </Link>

                <Link href="/favorite">
                  <li className="cursor-pointer mb-10 hover:text-yellow-400 transition-transform duration-300">
                    Favorites
                  </li>
                </Link>
                <Link href="/watchlater">
                  <li className="cursor-pointer mb-10 hover:text-yellow-400 transition-transform duration-300">
                    Watchlater
                  </li>
                </Link>

                <Link href="/account">
                  <li className="cursor-pointer mb-10 hover:text-yellow-400 transition-transform duration-300">
                    Profile
                  </li>
                </Link>

                <Link href="/settings">
                  <li className="cursor-pointer mb-10 hover:text-yellow-400 transition-transform duration-300">
                    Settings
                  </li>
                </Link>

                <Link href="/help">
                  <li className="cursor-pointer hover:text-yellow-400 transition-transform duration-300">
                    Help
                  </li>
                </Link>
              </ul>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
};

export default Nav;
