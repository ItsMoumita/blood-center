import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { MdLightMode } from "react-icons/md";
import { Tooltip } from "react-tooltip";

const ThemeToggle = () => {
  const [theme, setTheme] = useState("");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    } 
    // else {
    //   setTheme("light"); // Fallback default
    // }
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <>
      <button
        onClick={toggleTheme}
        data-tooltip-id="theme-tooltip"
        data-tooltip-content={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
        className="w-10 h-10 size-16 rounded-full flex items-center justify-center  hover:scale-110 transition-all duration-300"
      >
        {theme === "dark" ? (
          <MdLightMode className="text-[#BB2B29] hover:text-[#530404] text-3xl" />
        ) : (
          <FaMoon className="text-[#BB2B29] hover:text-[#530404] text-3xl" />
        )}
      </button>
      <Tooltip 
        id="theme-tooltip" 
        place="bottom" 
        effect="solid"
        delayShow={200}
        className=" !text-white !rounded-lg !px-3 !py-1 text-sm"
      />
    </>
  );
};

export default ThemeToggle;