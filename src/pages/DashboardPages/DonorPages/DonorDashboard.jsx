import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaRegEye } from "react-icons/fa";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DonorDashboard = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      axiosSecure
        .get(`/donation-requests/recent?email=${user.email}`)
        .then((res) => setRequests(res.data))
        .finally(() => setLoading(false));
    }
  }, [user, axiosSecure]);

  // Skeletons for loading
  const skeletonCards = Array.from({ length: 3 }).map((_, idx) => (
    <div key={idx} className="bg-[#FFE8E8] dark:bg-[#273a57] rounded-xl shadow p-4 animate-pulse">
      <Skeleton height={24} width={120} className="mb-2" />
      <Skeleton height={16} width={180} className="mb-2" />
      <Skeleton height={16} width={80} className="mb-2" />
      <Skeleton height={16} width={100} className="mb-2" />
      <Skeleton height={16} width={60} className="mb-2" />
      <Skeleton height={32} width={80} />
    </div>
  ));

  return (
    <div className="p-2 sm:p-4 min-h-screen w-full bg-gradient-to-b from-[#530404]/80 to-[#FFE8E8] dark:from-[#0F172A] dark:to-[#000000] text-white transition-colors duration-300">
      <div className="w-full max-w-6xl mx-auto mt-12 md:mt-8">
        <h2 className="text-2xl md:text-4xl  font-bold mb-4 text-[#FFE8E8] text-center">
          Welcome, {user?.displayName || "Donor"}!
        </h2>
        {requests.length > 0 || loading ? (
          <div>
            <h3 className="text-lg font-semibold mb-2 text-[#FFE8E8] text-center">
              Your Recent Donation Requests
            </h3>
            {/* Card view for mobile */}
            <div className="block md:hidden">
              <div className="grid grid-cols-1 gap-6">
                {loading
                  ? skeletonCards
                  : requests.map((req, idx) => (
                    <div
                      key={req._id}
                      className="bg-[#FFE8E8] dark:bg-[#273a57] rounded-xl shadow p-4 flex flex-col gap-2 animate-fadeIn"
                      style={{ animationDelay: `${idx * 60}ms` }}
                    >
                      <div className="font-bold text-[#530404] dark:text-[#FFE8E8] text-lg">{req.recipientName}</div>
                      <div className="text-[#530404] dark:text-[#FFE8E8] text-sm">{req.recipientDistrict}, {req.recipientUpazila}</div>
                      <div className="text-[#BB2B29] dark:text-[#ECAAA0] text-sm">{req.bloodGroup}</div>
                      <div className="text-[#530404] dark:text-[#FFE8E8] text-sm">Date: {req.donationDate}</div>
                      <div className="text-[#530404] dark:text-[#FFE8E8] text-sm">Time: {req.donationTime}</div>
                      <div className="text-[#530404] dark:text-[#FFE8E8] text-sm">Status: {req.donationStatus}</div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Link to={`/dashboard/donation-request/${req._id}`} className="btn btn-xs bg-white text-xl text-[#BB2B29] border-none hover:bg-[#ECAAA0]">
                          <FaRegEye />
                        </Link>
                        <Link to={`/dashboard/edit-donation-request/${req._id}`} className="btn btn-xs text-xl bg-white text-[#BB2B29] border-none hover:bg-[#ECAAA0]">
                          <RiEdit2Fill />
                        </Link>
                        <button className="btn btn-xs bg-white text-[#BB2B29] border-none text-xl hover:bg-[#ECAAA0]">
                          <MdDeleteForever />
                        </button>
                        {req.donationStatus === "inprogress" && (
                          <>
                            <button className="btn btn-xs bg-white text-[#BB2B29] border-none hover:bg-[#ECAAA0]">
                              Done
                            </button>
                            <button className="btn btn-xs bg-white text-[#BB2B29] border-none hover:bg-[#ECAAA0]">
                              Cancel
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            {/* Table view for md+ */}
            <div className="hidden md:block">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#FFE8E8]">
                    <th className="py-3 px-4 text-left text-[#BB2B29] dark:text-[#FFE8E8] font-semibold">Recipient</th>
                    <th className="py-3 px-4 text-left text-[#BB2B29] dark:text-[#FFE8E8] font-semibold">Location</th>
                    <th className="py-3 px-4 text-left text-[#BB2B29] dark:text-[#FFE8E8] font-semibold">Date</th>
                    <th className="py-3 px-4 text-left text-[#BB2B29] dark:text-[#FFE8E8] font-semibold">Time</th>
                    <th className="py-3 px-4 text-left text-[#BB2B29] dark:text-[#FFE8E8] font-semibold">Blood Group</th>
                    <th className="py-3 px-4 text-left text-[#BB2B29] dark:text-[#FFE8E8] font-semibold">Status</th>
                    <th className="py-3 px-4 text-left text-[#BB2B29] dark:text-[#FFE8E8] font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading
                    ? Array.from({ length: 3 }).map((_, idx) => (
                      <tr key={idx}>
                        <td colSpan={7}><Skeleton height={40} /></td>
                      </tr>
                    ))
                    : requests.map((req) => (
                      <tr key={req._id} className="group border-b border-b-[#FFE8E8]">
                        <td className="py-3 px-2 md:px-4 text-white dark:text-[#FFE8E8] font-semibold">
                          {req.recipientName}
                        </td>
                        <td className="py-3 px-2 md:px-4 text-white dark:text-[#FFE8E8]">
                          {req.recipientDistrict}, {req.recipientUpazila}
                        </td>
                        <td className="py-3 px-2 md:px-4 text-white dark:text-[#FFE8E8]">
                          {req.donationDate}
                        </td>
                        <td className="py-3 px-2 md:px-4 text-white dark:text-[#FFE8E8]">
                          {req.donationTime}
                        </td>
                        <td className="py-3 px-2 md:px-4 text-white dark:text-[#FFE8E8]">
                          {req.bloodGroup}
                        </td>
                        <td className="py-3 px-2 md:px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold
                            ${req.donationStatus === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : req.donationStatus === "inprogress"
                              ? "bg-blue-100 text-blue-700"
                              : req.donationStatus === "done"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                            }`}>
                            {req.donationStatus}
                          </span>
                        </td>
                        <td className="py-3 px-2 md:px-4 z-50">
                          <div className="flex flex-col md:flex-row gap-1">
                            <Link to={`/dashboard/donation-request/${req._id}`} className="btn btn-xs bg-white text-xl text-[#BB2B29] border-none hover:bg-[#ECAAA0]">
                              <FaRegEye />
                            </Link>
                            <Link to={`/dashboard/edit-donation-request/${req._id}`} className="btn btn-xs text-xl bg-white text-[#BB2B29] border-none hover:bg-[#ECAAA0]">
                              <RiEdit2Fill />
                            </Link>
                            <button className="btn btn-xs bg-white text-[#BB2B29] border-none text-xl hover:bg-[#ECAAA0]">
                              <MdDeleteForever />
                            </button>
                            {req.donationStatus === "inprogress" && (
                              <>
                                <button className="btn btn-xs bg-white text-[#BB2B29] border-none hover:bg-[#ECAAA0]">
                                  Done
                                </button>
                                <button className="btn btn-xs bg-white text-[#BB2B29] border-none hover:bg-[#ECAAA0]">
                                  Cancel
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-center">
              <Link to="/dashboard/my-donation-requests" className="btn mt-4 bg-white text-[#BB2B29] border-none hover:bg-[#ECAAA0]">
                View My All Requests
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-gray-300 mt-8 text-center">You have not made any donation requests yet.</div>
        )}
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
  );
};

export default DonorDashboard;