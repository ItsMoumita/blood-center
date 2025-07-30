import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaRegEye } from "react-icons/fa";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import Loading from "../../../components/ExtraComponents/Loading";

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
        .then((res) => setRequests(res.data));
    }
    setLoading(false);
  }, [user, axiosSecure]);

  if(loading) return <Loading></Loading>
  return (
    <div className="p-2 sm:p-4 min-h-screen w-full bg-gradient-to-b from-[#530404]/80 to-[#FFE8E8] dark:from-[#0F172A] dark:to-[#000000] text-white transition-colors duration-300">
      <div className="w-full max-w-6xl mx-auto mt-4">
        <h2 className="text-2xl font-bold mb-4 text-[#FFE8E8] text-center">
          Welcome, {user?.displayName || "Donor"}!
        </h2>
        {requests.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-2 text-[#FFE8E8] text-center">
              Your Recent Donation Requests
            </h3>
            <div className="w-full">
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
                  {requests.map((req) => (
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
        )}
        {requests.length === 0 && (
          <div className="text-gray-300 mt-8 text-center">You have not made any donation requests yet.</div>
        )}
      </div>
    </div>
  );
};

export default DonorDashboard;