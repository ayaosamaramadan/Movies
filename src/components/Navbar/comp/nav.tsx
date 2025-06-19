"use client";
import Link from "next/link";
import { IoIosHelpCircleOutline, IoMdPerson } from "react-icons/io";
import { IoHome } from "react-icons/io5";
import { MdWatchLater } from "react-icons/md";
import { GiTentacleHeart } from "react-icons/gi";
import { RiMovieFill } from "react-icons/ri";

const Nav = () => {
  return (
    <>
      <header className="rounded-br-4xl rounded-tr-4xl fixed pt-15 bg-[#7f00d4] opacity-90 w-auto hover:w-[250px] duration-300 ease-in-out z-10 sm:w-[80px] sm:hover:w-[250px]">
        <div>
          <ul>
        <li>
          <div className="ml-1 p-5 flex-col items-center">
            <Link href="/">
          <IoHome className="text-white mb-10 mt-[-10px] text-2xl transition-all duration-300 hover:text-yellow-400 hover:scale-125 hover:rotate-6" />
            </Link>
            <Link href="/section4">
          <RiMovieFill className="text-white mb-10 text-2xl transition-all duration-300 hover:text-yellow-400 hover:scale-125 hover:-rotate-6" />
            </Link>
            <Link href="/favorite">
          <GiTentacleHeart className="text-white mb-10 text-2xl transition-all duration-300 hover:text-pink-400 hover:scale-125 hover:rotate-12" />
            </Link>
            <Link href="/section5">
          <MdWatchLater className="text-white mb-10 text-2xl transition-all duration-300 hover:text-yellow-400 hover:scale-125 hover:-rotate-12" />
            </Link>
            <Link href="/section3">
          <IoMdPerson className="text-white mb-10 text-2xl transition-all duration-300 hover:text-yellow-400 hover:scale-125 hover:rotate-3" />
            </Link>
            <Link href="/help">
          <IoIosHelpCircleOutline className="text-white mb-10 text-2xl transition-all duration-300 hover:text-yellow-400 hover:scale-125 hover:-rotate-3" />
            </Link>
          </div>
        </li>
        <li>
          <ul className="flex flex-col justify-center items-center absolute top-5 left-0 w-full h-full text-white opacity-0 hover:opacity-100 transition-opacity duration-300 bg-opacity-50">
            <Link href="/">
          <li className="cursor-pointer mb-10 mt-[-19px] transition-all duration-300 hover:text-yellow-400 hover:scale-110 hover:translate-x-2">
            Home
          </li>
            </Link>
            <Link href="/movies">
          <li className="cursor-pointer mb-10 transition-all duration-300 hover:text-yellow-400 hover:scale-110 hover:translate-x-2">
            Movies
          </li>
            </Link>
            <Link href="/favorite">
          <li className="cursor-pointer mb-10 transition-all duration-300 hover:text-pink-400 hover:scale-110 hover:translate-x-2">
            Favorites
          </li>
            </Link>
            <Link href="/watchlater">
          <li className="cursor-pointer mb-10 transition-all duration-300 hover:text-yellow-400 hover:scale-110 hover:translate-x-2">
            Watchlater
          </li>
            </Link>
            <Link href="/account">
          <li className="cursor-pointer mb-10 transition-all duration-300 hover:text-yellow-400 hover:scale-110 hover:translate-x-2">
            Profile
          </li>
            </Link>
            <Link href="/help">
          <li className="cursor-pointer transition-all duration-300 hover:text-yellow-400 hover:scale-110 hover:translate-x-2">
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
