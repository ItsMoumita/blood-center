import animation from "../assets/bloodPressure.json";
import Lottie from "lottie-react";

import { Link } from "react-router";
import { Typewriter } from "react-simple-typewriter";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Banner = () => {
  const leftRef = useRef();

  useEffect(() => {
    gsap.from(leftRef.current, {
      opacity: 50,
      x: -50,
      duration: 1.2,
      ease: "power3.out",
    });
  }, []);

  return (
    <section className="relative min-h-[60vh] md:min-h-[70vh] flex flex-col md:flex-row items-center justify-between bg-gradient-to-br from-[#87CEEB] via-[#F5F5F5] to-[#FFF] dark:from-[#14274E] dark:via-black/30 dark:to-gray-500 transition-colors duration-300 overflow-hidden backdrop-blur-sm bg-opacity-80">
      {/* Left Content */}
      <div
        ref={leftRef}
        className="z-10 flex-1 flex flex-col justify-center items-start px-6 md:px-32 py-12"
      >
        <span className="uppercase text-xs md:text-sm tracking-widest text-[#BB2B29] dark:text-white/70 font-semibold mb-2">
          Let's Donate
        </span>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-[#22223B] dark:text-[#FFE8E8] mb-4 leading-tight">
          <span>
            <Typewriter
              words={[
                "Your Blood Donation Matters.",
                "Give Today!",
                "Be a Hero. Save Lives.",
              ]}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={60}
              deleteSpeed={40}
              delaySpeed={1800}
            />
          </span>
        </h1>
        <p className="text-base md:text-lg text-[#530404] dark:text-[#FFE8E8] mb-8">
          All types of blood are needed to help patients.
        </p>
        <div className="flex gap-4">
          <Link
            to="/registration"
            className="px-6 py-3 rounded font-bold bg-[#BB2B29] text-white hover:bg-[#530404] transition"
          >
            Join as a Donor
          </Link>
          <Link
            to="/search"
            className="px-6 py-3 rounded font-bold border-2 border-[#BB2B29] text-[#BB2B29] dark:border-[#FFE8E8] dark:text-[#FFE8E8] hover:bg-[#BB2B29] hover:text-white transition"
          >
            Search Donors
          </Link>
        </div>
      </div>
      {/* Right Image */}
      <div className="flex-1 w-full h-full hidden md:block">
        <Lottie
          animationData={animation}
          loop={true}
          style={{ width: "100%", height: "100%" }}
          aria-label="Blood Donation Animation"
        />
      </div>
      {/* Optional: Overlay for dark mode */}
      {/* <div className="absolute inset-0 bg-black/10 dark:bg-black/30 pointer-events-none"></div> */}
    </section>
  );
};

export default Banner;