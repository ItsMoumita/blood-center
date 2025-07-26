import { useContext, useState } from "react";
import { CgMenuMotion } from "react-icons/cg";
import { RiMenuAddLine } from "react-icons/ri";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";
import ThemeToggle from "./ThemeToggle";
import { FaUserCircle } from "react-icons/fa";
import Lottie from "lottie-react";
import BloodDrop from "../assets/BloodDrop.json";

const menu = [
  { name: "Home", path: "/" },
  { name: "Donation Requests", path: "/donation-requests" },
  { name: "Blog", path: "/blog" },
];

const Header = () => {
  const { user, setUser, logOut } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const logOuthandle = () => {
    logOut()
      .then(() => {
        setUser(null);
        setDropdownOpen(false);
        setIsMenuOpen(false);
        Swal.fire({
          icon: "success",
          title: "Logout Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        console.error("Logout failed:", err);
      });
  };

  console.log("🚀 ~ Header ~ user:", user);

  return (
    <nav className="sticky top-0 bg-[#F5F5F5] dark:bg-[#FFE8E8] border-b-2 border-[#BB2B29] dark:border-[#530404] shadow-lg z-50 ">
      <div className="w-11/12 mx-auto py-2 flex justify-between items-center relative">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center justify-center "
        >
          <Lottie
            animationData={BloodDrop}
            loop={true}
            style={{ width: "70px", height: "70px" }}
            aria-label="Blood Drop Logo"
          />
          <span
            className="bg-gradient-to-r from-[#BB2B29] to-[#530404] bg-clip-text text-transparent font-extrabold text-2xl lg:text-3xl tracking-tight text-center"
          >
            BloodCenter
          </span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-6">
          {menu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-[#ECAAA0] dark:bg-[#BB2B29] text-[#BB2B29] dark:text-[#FFE8E8] shadow-md"
                    : "text-[#530404]  hover:text-[#BB2B29]"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

          {/* Auth Section */}
          {user && user?.email ? (
            <div className="relative">
              <button
                className="ml-2 flex items-center gap-2 focus:outline-none"
                onClick={() => setDropdownOpen((prev) => !prev)}
                aria-label="User menu"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="w-10 h-10 rounded-full border-2 border-[#BB2B29]"
                  />
                ) : (
                  <FaUserCircle className="w-10 h-10 text-[#BB2B29]" />
                )}
              </button>
              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-[#FFE8E8] rounded-lg shadow-md z-50 border border-[#ECAAA0]">
                  <NavLink
                    to="/dashboard"
                    className="block px-4 py-3 text-[#530404] border-b border-[#ECAAA0] rounded-t-lg font-medium hover:bg-[#ECAAA0]"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Dashboard
                  </NavLink>
                  <button
                    onClick={logOuthandle}
                    className="w-full text-left px-4 py-2 text-[#BB2B29] hover:bg-[#ECAAA0] rounded-b-lg font-medium transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <NavLink
                to="/login"
                className="px-5 py-2 rounded-lg text-[#530404] font-medium hover:bg-[#ECAAA0] hover:text-[#BB2B29] transition"
              >
                Login
              </NavLink>
              <NavLink
                to="/registration"
                className="px-5 py-2 rounded-lg text-[#530404] font-medium hover:bg-[#ECAAA0] hover:text-[#BB2B29] transition"
              >
                Register
              </NavLink>
            </>
          )}

          <ThemeToggle />
        </ul>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-2">
          {!isMenuOpen ? (
            <RiMenuAddLine
              onClick={() => setIsMenuOpen(true)}
              className="text-2xl text-[#BB2B29] ml-2 cursor-pointer"
              aria-label="Open menu"
            />
          ) : (
            <CgMenuMotion
              onClick={() => setIsMenuOpen(false)}
              className="text-2xl text-[#BB2B29] ml-2 cursor-pointer"
              aria-label="Close menu"
            />
          )}
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <ul className="flex flex-col absolute top-full left-0 w-full bg-[#F5F5F5] dark:bg-[#FFE8E8] border-b-2 border-[#BB2B29] dark:border-[#530404] shadow-lg border-t z-50 p-4 lg:hidden">
            {/* Menu options - left aligned */}
            <div className="flex flex-col gap-1 text-left">
              {menu.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `block px-2 py-2 rounded font-medium ${
                      isActive
                        ? "bg-[#BB2B29] text-[#FFE8E8] shadow"
                        : "text-[#530404] hover:bg-[#ECAAA0] hover:text-[#BB2B29]"
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </NavLink>
              ))}
            </div>

            {/* Divider */}
            <hr className="my-3 border-[#ECAAA0]" />

            {/* User info or login/register */}
            {user && user?.email ? (
              <div className="flex flex-col items-start gap-2">
                <div className="flex items-center gap-3">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="Profile"
                      className="w-10 h-10 rounded-full border-2 border-[#BB2B29]"
                    />
                  ) : (
                    <FaUserCircle className="w-10 h-10 text-[#BB2B29]" />
                  )}
                  <div>
                    <div className="font-semibold text-[#530404]">{user.displayName || "User"}</div>
                  </div>
                </div>
                <button
                  onClick={logOuthandle}
                  className="mt-2 px-4 py-2 rounded bg-[#BB2B29] text-[#FFE8E8] font-semibold hover:bg-[#530404] transition"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <NavLink
                  to="/login"
                  className="px-4 py-2 rounded text-[#530404] font-medium hover:bg-[#ECAAA0] hover:text-[#BB2B29] transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/registration"
                  className="px-4 py-2 rounded text-[#530404] font-medium hover:bg-[#ECAAA0] hover:text-[#BB2B29] transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </NavLink>
              </div>
            )}

            {/* Theme Toggle at the bottom */}
            <div className="mt-4">
              <ThemeToggle />
            </div>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Header;