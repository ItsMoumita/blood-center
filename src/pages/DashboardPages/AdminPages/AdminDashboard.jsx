import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUsers, FaHandHoldingUsd, FaTint } from "react-icons/fa";
import Loading from "../../../components/ExtraComponents/Loading";

const statCards = [
  {
    title: "Total Donors/Volunteers",
    icon: <FaUsers className="text-2xl" />,
    key: "totalUsers",
    changeKey: "usersChange",
    iconBg: "bg-[#ECAAA0]/60 text-[#BB2B29]",
  },
  {
    title: "Total Funding",
    icon: <FaHandHoldingUsd className="text-2xl" />,
    key: "totalFunding",
    changeKey: "fundingChange",
    iconBg: "bg-[#FFE8E8]/60 text-[#BB2B29]",
    isMoney: true,
  },
  {
    title: "Total Requests",
    icon: <FaTint className="text-2xl" />,
    key: "totalRequests",
    changeKey: "requestsChange",
    iconBg: "bg-[#BB2B29]/10 text-[#BB2B29]",
  },
];

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState({});
   const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axiosSecure.get("/admin-dashboard-stats").then(res => setStats(res.data));
    setLoading(false);

  }, []);
 //console.log(stats)

 if(loading) return <Loading></Loading>


  return (
    <div className="w-full p-4 md:8 min-h-screen bg-gradient-to-b from-[#530404]/80 to-[#FFE8E8] dark:from-[#0F172A] dark:to-[#000000]">
      <h2 className="text-2xl md:text-4xl text-center  font-bold mb-8 text-[#FFE8E8]">Welcome, {user?.displayName || "Admin"}!</h2>
      <div className="w-full md:w-3/4 mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {statCards.map(card => {
          // const change = parseFloat(stats[card.changeKey] || 0);
          // const isIncrease = change >= 0;
          return (
            <div
              key={card.key}
              className="bg-white dark:bg-[#273a57] rounded-2xl shadow-lg p-6 flex items-center gap-6"
            >
              <div className={`bg-[#FFE8E8]/60 rounded-xl p-4 flex items-center justify-center ${card.iconBg}`}>
                {card.icon}
              </div>
              <div className="flex-1">
                <div className="text-lg font-semibold text-[#530404] dark:text-[#FFE8E8] mb-1">{card.title}</div>
                <div className="text-3xl font-bold text-[#BB2B29] dark:text-[#FFE8E8] mb-2">
                  {card.isMoney
                    ? `$${stats[card.key] || 0}`
                    : stats[card.key] || 0}
                </div>
                {/* <div className="flex items-center gap-2 text-sm">
                  <span className={`px-2 py-0.5 rounded font-bold
                    ${isIncrease
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                    }`}>
                    {isIncrease ? "↑" : "↓"} {Math.abs(change)}%
                  </span>
                  <span className="text-gray-500 dark:text-gray-300">this month</span>
                </div> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminDashboard;