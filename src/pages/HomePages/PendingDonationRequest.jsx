import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { FaRegEye } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const PendingDonationRequests = () => {
  const [requests, setRequests] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/search-donation-requests`)
      .then(res => setRequests(res.data));
  }, []);

  // Redirect to login if not logged in
  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#530404]/80 to-[#FFE8E8] dark:from-[#0F172A] dark:to-[#000000] p-4">
      <div className="max-w-4xl mx-auto bg-white dark:bg-[#273a57] rounded-2xl shadow-lg p-8 mt-8">
        <h2 className="text-2xl font-bold mb-8 text-center text-[#BB2B29] dark:text-[#FFE8E8]">Pending Donation Requests</h2>
        {requests.length === 0 ? (
          <div className="text-center text-[#BB2B29] font-semibold">No pending requests found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {requests.map(req => (
              <div key={req._id} className="bg-[#FFE8E8] dark:bg-[#1a2233] rounded-xl shadow p-4 flex flex-col gap-2">
                <div className="font-bold text-[#530404] dark:text-[#FFE8E8] text-lg">{req.recipientName}</div>
                <div className="text-[#530404] dark:text-[#FFE8E8] text-sm">{req.recipientDistrict}, {req.recipientUpazila}</div>
                <div className="text-[#BB2B29] dark:text-[#ECAAA0] text-sm">{req.bloodGroup}</div>
                <div className="text-[#530404] dark:text-[#FFE8E8] text-sm">Date: {req.donationDate}</div>
                <div className="text-[#530404] dark:text-[#FFE8E8] text-sm">Time: {req.donationTime}</div>
                <button
                  className="mt-2 flex items-center gap-2 justify-center bg-[#E53935] text-white font-bold rounded-lg py-2 px-4 uppercase tracking-wider hover:bg-[#bb2b29] transition"
                  onClick={() => navigate(`/donation-request/${req._id}`)}
                >
                  <FaRegEye /> View
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingDonationRequests;