import { useContext, useState } from "react";
import { CgMenuMotion } from "react-icons/cg";
import { RiMenuAddLine } from "react-icons/ri";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import ThemeToggle from "../ExtraComponents/ThemeToggle";
import { FaUserCircle } from "react-icons/fa";
import Lottie from "lottie-react";
import BloodDrop from "../../assets/BloodDrop.json";

const menu = [
  { name: "Home", path: "/" },
  { name: "Donation Requests", path: "/pending-donation-requests" },
  { name: "Blog", path: "/blog" },
];

const Header = () => {
  const { user, setUser, logOut } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logOuthandle = () => {
    logOut()
      .then(() => {
        setUser(null);
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

  return (
    <nav className="sticky top-0 bg-[#F5F5F5] dark:bg-[#0F172A] border-b-2 border-[#BB2B29] dark:border-[#530404] shadow-lg z-50 ">
      <div className="w-11/12 mx-auto py-2 flex justify-between items-center relative">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center ">
          <Lottie
            animationData={BloodDrop}
            loop={true}
            style={{ width: "70px", height: "70px" }}
            aria-label="Blood Drop Logo"
          />
          <span className="bg-gradient-to-r from-[#BB2B29] to-[#530404] dark:from-[#BB2B29] dark:to-[#FFE8E8] bg-clip-text text-transparent font-extrabold text-2xl lg:text-3xl tracking-tight text-center">
            BloodCenter
          </span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-6 text-lg">
          {menu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-[#FFE8E8] dark:bg-[#BB2B29] text-[#BB2B29] dark:text-[#FFE8E8] shadow-md"
                    : "text-[#530404] dark:text-[#FFE8E8] hover:text-[#BB2B29]"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

          {/* Show Dashboard only if logged in */}
          {user && user?.email && (
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-[#FFE8E8] dark:bg-[#BB2B29] text-[#BB2B29] dark:text-[#FFE8E8] shadow-md"
                    : "text-[#530404] dark:text-[#FFE8E8] hover:text-[#BB2B29]"
                }`
              }
            >
              Dashboard
            </NavLink>
          )}

          {/* Auth Section */}
          {user && user?.email ? (
            <div className="relative group">
              <button
                className="ml-2 flex items-center gap-2 focus:outline-none"
                aria-label="User menu"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="w-10 h-10 rounded-full border-2 border-[#BB2B29] dark:border-[#FFE8E8]"
                  />
                ) : (
                  <FaUserCircle className="w-12 h-12 text-[#BB2B29]" />
                )}
              </button>
              {/* Dropdown (hover) */}
              <div className="absolute right-0 mt-2 w-40 bg-[#F5F5F5] dark:bg-[#182441] rounded-lg shadow-md z-50 border border-[#BB2B29] dark:border-[#530404] opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-opacity duration-200">
                <button
                  onClick={logOuthandle}
                  className="w-full text-left px-4 py-2 text-lg text-[#530404] hover:text-[#F5F5F5] dark:text-[#F5F5F5] hover:bg-[#BB2B29] rounded-lg font-medium transition"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <>
              <NavLink
                to="/login"
                className="px-5 py-2 rounded-lg text-lg text-[#530404] font-medium hover:bg-[#ECAAA0] hover:text-[#BB2B29] transition"
              >
                Login
              </NavLink>
              <NavLink
                to="/registration"
                className="px-5 py-2 rounded-lg text-lg text-[#530404] font-medium hover:bg-[#ECAAA0] hover:text-[#BB2B29] transition"
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
          <ul className="flex flex-col absolute top-full left-0 w-full bg-[#F5F5F5] dark:bg-[#182441] border-b-1 border-[#BB2B29] dark:border-[#530404] shadow-lg border-t z-50 p-4 lg:hidden text-lg">
            {/* Menu options */}
            <div className="flex flex-col gap-1 text-left">
              {menu.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `block px-2 py-2 rounded font-medium ${
                      isActive
                        ? "bg-[#FFE8E8] dark:bg-[#BB2B29] text-[#BB2B29] dark:text-[#F5F5F5] shadow"
                        : "text-[#530404] dark:text-[#F5F5F5] hover:text-[#BB2B29]"
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </NavLink>
              ))}

              {/* Dashboard for logged in user */}
              {user && user?.email && (
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `block px-2 py-2 rounded font-medium ${
                      isActive
                        ? "bg-[#FFE8E8] dark:bg-[#BB2B29] text-[#BB2B29] dark:text-[#F5F5F5] shadow"
                        : "text-[#530404] dark:text-[#F5F5F5] hover:text-[#BB2B29]"
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </NavLink>
              )}
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
                  <div className="text-lg text-[#530404] dark:text-[#F5F5F5]">
                    {user.displayName || "User"}
                  </div>
                </div>
                <button
                  onClick={logOuthandle}
                  className="mt-2 px-4 py-2 rounded bg-[#BB2B29] text-[#FFE8E8] font-semibold hover:bg-[#530404] transition text-lg"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <NavLink
                  to="/login"
                  className="px-4 py-2 rounded text-lg text-[#530404] font-medium hover:bg-[#ECAAA0] hover:text-[#BB2B29] transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/registration"
                  className="px-4 py-2 rounded text-lg text-[#530404] font-medium hover:bg-[#ECAAA0] hover:text-[#BB2B29] transition"
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
