import { NavLink } from "react-router";
import useRole from "../hooks/useRole";

export default function DashboardSidebar() {
  const NavItem = ({ to, icon, label }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded-lg font-medium ${
          isActive
            ? "bg-blue-100 text-blue-600"
            : "text-gray-700 hover:bg-gray-200"
        }`
      }
    >
      {icon} {label}
    </NavLink>
  );

  const { role, loading } = useRole();

  
  if (loading) return <h1>Loading...</h1>;

  if (role === "admin")
    return (
      <nav className="flex flex-col gap-4">
        <NavItem
          to="/dashboard"
          // icon={<Home size={20} />}
          label="Admin Dashboard Home"
        />
        <NavItem
          to="/dashboard/all-users"
          // icon={<Plus size={20} />}
          label="All Users"
        />
        <NavItem
          to="/dashboard/my-books"
          // icon={<List size={20} />}
          label="My Books"
        />
        <NavItem
          to="/dashboard/my-requests"
          // icon={<BookOpen size={20} />}
          label="My Requests"
        />
        <NavItem
          to="/dashboard/profile"
          // icon={<User size={20} />}
          label="Profile"
        />
      </nav>
    );
  if (role === "moderator")
    return (
      <nav className="flex flex-col gap-4">
        <NavItem
          to="/dashboard"
          // icon={<Home size={20} />}
          label="Moderator Dashboard"
        />
      </nav>
    );

  // user sidebar
  return (
    <nav className="flex flex-col gap-4">
      <NavItem
        to="/dashboard"
        // icon={<Home size={20} />}
        label="User Dashboard"
      />

      <NavItem
        to="/dashboard/add-book"
        // icon={<Plus size={20} />}
        label="Add Book"
      />
      <NavItem
        to="/dashboard/my-books"
        // icon={<List size={20} />}
        label="My Books"
      />
      <NavItem
        to="/dashboard/my-requests"
        // icon={<BookOpen size={20} />}
        label="My Requests"
      />
      <NavItem
        to="/dashboard/profile"
        // icon={<User size={20} />}
        label="Profile"
      />
    </nav>
  );
}
