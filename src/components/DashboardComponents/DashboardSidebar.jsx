import { useContext, useState } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../providers/AuthProvider";
import { FaBars, FaTimes, FaHome, FaPlusCircle, FaListAlt, FaUsers, FaTint, FaEdit} from "react-icons/fa";
import { LiaDonateSolid } from "react-icons/lia";
import Loading from "../ExtraComponents/Loading";
import ThemeToggle from "../ExtraComponents/ThemeToggle";
import { RingLoader } from "react-spinners";

const donorMenu = [
  { name: "Dashboard Home", path: "/dashboard", icon: <FaHome /> },
  { name: "My Donation Requests", path: "/dashboard/my-donation-requests", icon: <FaListAlt /> },
  { name: "Create Donation Request", path: "/dashboard/create-donation-request", icon: <FaPlusCircle /> },
  {
    name: "Donate Now" , path: "/dashboard/funding", icon: <LiaDonateSolid />
  }
];

const adminMenu = [
  { name: "Dashboard Home", path: "/dashboard", icon: <FaHome /> },
  { name: "All Users", path: "/dashboard/all-users", icon: <FaUsers /> },
  { name: "All Blood Donation Requests", path: "/dashboard/all-blood-donation-request", icon: <FaTint /> },
  { name: "Content Management", path: "/dashboard/content-management", icon: <FaEdit /> },
];

const volunteerMenu = [
  { name: "Dashboard Home", path: "/dashboard", icon: <FaHome /> },
  { name: "All Blood Donation Requests", path: "/dashboard/all-blood-donation-request", icon: <FaTint /> },
   { name: "Content Management", path: "/dashboard/content-management", icon: <FaEdit /> },

];

const DashboardSidebar = () => {
  const [open, setOpen] = useState(false);
  const { user, role, loading } = useContext(AuthContext);

  let menu = donorMenu;
  if (role === "admin") menu = adminMenu;
  else if (role === "volunteer") menu = volunteerMenu;

  if (loading) return (
    <div className="flex items-center bg-[#FFE8E8] dark:bg-[#530404]">
      <RingLoader color="#BB2B29" size={90} />
    </div>
  );

  return (
    <>
      {/* Mobile menu button */}
      <button
        className={`lg:hidden fixed top-4 left-4 z-50 bg-[#BB2B29] text-white p-2 rounded-full shadow
           ${open ? "hidden" : ""}`}
        onClick={() => setOpen(true)}
        aria-label="Open dashboard menu"
      >
        <FaBars size={24} />
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 min-h-100vh w-64 bg-[#F5F5F5] dark:bg-[#0F172A] shadow-lg z-40
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:w-64
        `}
      >
       
        {/* Close button for mobile */}
        <div className="flex items-center justify-between p-4 lg:hidden">
          <span className="font-bold text-lg text-[#BB2B29] dark:text-[#FFE8E8]">Dashboard</span>
          <button
            onClick={() => setOpen(false)}
            className="text-[#BB2B29] dark:text-[#FFE8E8]"
            aria-label="Close dashboard menu"
          >
            <FaTimes size={24} />
          </button>
        </div>

        {/* Avatar and Profile Link */}
        <div className="flex flex-col items-center mt-6 mb-2">
          <img
            src={user?.photoURL || user?.photo || "/default-avatar.png"}
            alt="avatar"
            className="w-18 h-18 rounded-full border-3 border-[#BB2B29] dark:border-[#FFE8E8] shadow-lg object-cover"
          />
          <div className="mt-2 font-bold text-[#530404] dark:text-[#FFE8E8] text-lg text-center">
            {user?.displayName || user?.name || "User"}
          </div>
          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              `mt-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isActive
                  ? "bg-[#FFE8E8] text-[#BB2B29] dark:bg-[#BB2B29] dark:text-white  shadow-md"
                  : "text-[#530404] dark:text-[#FFE8E8] hover:bg-[#FFE8E8] hover:text-[#BB2B29] dark:hover:bg-[#1f2a42] dark:hover:text-[#FFE8E8]"
              }`
            }
          >
            Profile
          </NavLink>
          <ThemeToggle></ThemeToggle>
        </div>

        <nav className="mt-8 flex flex-col gap-2">
          {menu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-3 mx-2 rounded-lg font-medium transition-all duration-200
                ${isActive
                  ? "bg-[#FFE8E8] text-[#BB2B29] dark:bg-[#BB2B29] dark:text-white  shadow-md"
                  : "text-[#530404] dark:text-[#FFE8E8] hover:bg-[#FFE8E8] hover:text-[#BB2B29] dark:hover:bg-[#1f2a42] dark:hover:text-[#FFE8E8]"
                }`
              }
              onClick={() => setOpen(false)} 
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
           <Link to='/'>
        <button className="text-[#530404] dark:text-[#FFE8E8] text-center w-48 rounded-2xl h-14 relative  text-xl font-semibold group" type="button">
          <div className="bg-[#BB2B29] mr-1 rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500">
            <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" height="25px" width="25px">
              <path d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z" fill="#FFE8E8" />
              <path d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z" fill="#FFE8E8" />
            </svg>
          </div>
          <p className="translate-x-2 ml-2">Go to home</p>
        </button>
      </Link>
        </nav>
      </aside>

      {open && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-lg bg-opacity-30 z-30 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default DashboardSidebar;