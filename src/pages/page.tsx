import "../../styles/globals.css";
import Image from "next/image";
import { IoStarSharp } from "react-icons/io5";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Movieslider from "./home/Movieslider";
import Favslider from "./home/Favslider";

const Homee = () => {
  return (
    <>
      <div className="ml-32 mt-28">
        <div className="flex justify-left items-center ">
          <div className="flex rounded-4xl w-[90%] bg-gradient-to-r from-[#7f00d4] via-[#9e0cff85] to-[#ab42f1]">
            <div>
              <Image
                src="/purp.webp"
                alt="Profile Picture"
                width={170}
                height={100}
                className="rounded-4xl"
              />
            </div>

            <div className="mx-20 ml-6 flex flex-col justify-center">
              <p className="text-sm font-extrabold tracking-widest text-white drop-shadow-xl uppercase [font-family:'Orbitron',sans-serif]">
                Ballerina
              </p>
              <span className="text-4xl font-extrabold tracking-widest drop-shadow-[2px_2px_10px_#7f00d4] font-mono bg-gradient-to-r from-[#ffffff] via-white to-[#7f00d4] bg-clip-text text-transparent">
                Popular <span className="text-[#00fff2]">#1</span>
              </span>
              <span className="text-4xl font-extrabold tracking-widest drop-shadow-[2px_2px_10px_#7f00d4] font-mono bg-gradient-to-r from-[#d3d3d3] via-white to-[#ffffff] bg-clip-text text-transparent">
                Movies
              </span>
              <div className="flex items-center mt-2">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <IoStarSharp key={idx} className="text-yellow-400 text-xl" />
                ))}
              </div>
            </div>
            <div>
              <div className="flex flex-col justify-end pb-5 pl-40 h-full">
                <button
                  className="cursor-pointer bg-[#6716a185] text-white rounded-tl-2xl rounded-br-2xl border-2 border-white px-4 py-2 font-semibold shadow transition-all duration-300 ease-in-out
                  hover:bg-gradient-to-r hover:from-[#7f00d4] hover:to-[#00fff2] hover:shadow-2xl
                  hover:border-[#00fff2] hover:ring-4 hover:ring-[#00fff2]/40 relative overflow-hidden group"
                >
                  See Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* movie slider */}
        <Movieslider />

        {/* fav slider */}

        <Favslider />
      </div>
    </>
  );
};

export default Homee;
