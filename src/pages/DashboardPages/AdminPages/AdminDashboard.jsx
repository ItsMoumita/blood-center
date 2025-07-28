// src/pages/DashboardPages/AdminDashboard.jsx
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUsers, FaHandHoldingUsd, FaTint } from "react-icons/fa";

const statCards = [
  {
    title: "Total Donors/Volunteers",
    icon: <FaUsers className="text-3xl text-[#BB2B29] dark:text-[#FFE8E8]" />,
    key: "totalUsers",
    color: "from-[#FFE8E8] to-[#BB2B29] dark:from-[#530404] dark:to-[#BB2B29]",
  },
  {
    title: "Total Funding",
    icon: <FaHandHoldingUsd className="text-3xl text-[#BB2B29] dark:text-[#FFE8E8]" />,
    key: "totalFunding",
    color: "from-[#ECAAA0] to-[#BB2B29] dark:from-[#530404] dark:to-[#BB2B29]",
  },
  {
    title: "Total Requests",
    icon: <FaTint className="text-3xl text-[#BB2B29] dark:text-[#FFE8E8]" />,
    key: "totalRequests",
    color: "from-[#F5F5F5] to-[#BB2B29] dark:from-[#530404] dark:to-[#BB2B29]",
  },
];

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState({});

  useEffect(() => {
    axiosSecure.get("/admin-dashboard-stats").then(res => setStats(res.data));
  }, [axiosSecure]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Welcome, {user?.displayName || "Admin"}!</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {statCards.map(card => (
          <div
            key={card.key}
            className={`rounded-xl shadow-lg p-6 flex flex-col items-center bg-gradient-to-br ${card.color} transition-colors duration-300`}
          >
            {card.icon}
            <div className="text-3xl font-bold mt-2">
              {card.key === "totalFunding" ? `৳${stats[card.key] || 0}` : stats[card.key] || 0}
            </div>
            <div className="text-lg font-semibold mt-1 text-[#530404] dark:text-[#FFE8E8]">{card.title}</div>
          </div>
        ))}
      </div>
      {/* You can add recent requests or other admin widgets here */}
    </div>
  );
};

export default AdminDashboard;