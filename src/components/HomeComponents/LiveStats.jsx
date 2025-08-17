import { useEffect, useState } from "react";
import axios from "axios";
import CountUp from "react-countup";
import { FaUserFriends, FaHandHoldingUsd, FaTint, FaCheckCircle, FaUserTie } from "react-icons/fa";

const LiveCount = () => {
  const [counts, setCounts] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/live-counts`)
      .then(res => setCounts(res.data));
  }, []);

  const cards = [
    {
      label: "Active Donors",
      value: counts?.totalDonors || 0,
      icon: <FaUserFriends className="text-4xl text-[#BB2B29] dark:text-[#F5F5F5]" />,
      color: "bg-[#F5F5F5] dark:bg-[#273a57]",
    },
    {
      label: "Active Volunteers",
      value: counts?.totalVolunteers || 0,
      icon: <FaUserTie className="text-4xl text-[#BB2B29] dark:text-[#F5F5F5]" />,
      color: "bg-[#F5F5F5] dark:bg-[#273a57]",
    },
    {
      label: "Total Funding",
      value: counts?.totalFunding || 0,
      icon: <FaHandHoldingUsd className="text-4xl text-[#BB2B29] dark:text-[#F5F5F5]" />,
      color: "bg-[#F5F5F5] dark:bg-[#273a57]",
      prefix: "৳",
    },
    {
      label: "Donation Requests",
      value: counts?.totalRequests || 0,
      icon: <FaTint className="text-4xl text-[#BB2B29] dark:text-[#F5F5F5]" />,
      color: "bg-[#F5F5F5] dark:bg-[#273a57]",
    },
    {
      label: "Successful Donations",
      value: counts?.totalSuccessfulDonations || 0,
      icon: <FaCheckCircle className="text-4xl text-[#BB2B29] dark:text-[#F5F5F5]" />,
      color: "bg-[#F5F5F5] dark:bg-[#273a57]",
    },
  ];

  return (
    <div className="bg-[#F5F5F5] dark:bg-[#0F172A]">
      <div className="max-w-11/12 mx-auto py-8 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {cards.map((card, idx) => (
          <div
            key={card.label}
            className={`rounded-2xl shadow-lg p-6 shadow-sm shadow-gray-300 flex flex-col items-center ${card.color} transition-colors duration-300 animate-fadeIn`}
            style={{ animationDelay: `${idx * 80}ms` }}
          >
            {card.icon}
            <div className="text-4xl font-bold mt-2 text-[#BB2B29] dark:text-[#F5F5F5]">
              <CountUp end={card.value} duration={1.2} separator="," prefix={card.prefix || ""} />
            </div>
            <div className="text-lg font-semibold mt-1 text-[#530404] dark:text-[#F5F5F5]/80">{card.label}</div>
          </div>
        ))}
      </div>
      <style>
        {`
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(20px);}
            100% { opacity: 1; transform: translateY(0);}
          }
          .animate-fadeIn {
            animation: fadeIn 0.5s ease-in;
          }
        `}
      </style>
    </div>
    </div>
  );
};

export default LiveCount;