import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";
import Loading from "../../components/ExtraComponents/Loading";

const DonationRequestDetails = () => {
  const { id } = useParams();
  console.log(id);
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [request, setRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
    axiosSecure.get(`/donation-requests/${id}`).then(res => setRequest(res.data));
  }, [id, user, navigate]);
console.log(request)
  const handleDonate = async (e) => {
    e.preventDefault();
    console.log("entered")
    await axiosSecure.patch(`/donation-requests/${id}/confirm-donation`, {
      donorName: user.displayName,
      donorEmail: user.email,
    });
    setShowModal(false);
    Swal.fire("Success", "You have confirmed your donation!", "success");
    // Optionally, refresh the request
    axiosSecure.get(`/donation-requests/${id}`).then(res => setRequest(res.data));
  };

  if (!request) return (
   <Loading></Loading>
  );

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#87CEEB] via-[#F5F5F5] to-[#FFF] dark:from-[#14274E] dark:via-black/30 dark:to-gray-500 transition-colors duration-300 overflow-hidden backdrop-blur-sm bg-opacity-80 flex flex-col items-center justify-center py-8">
      <h2 className="text-2xl md:text-4xl font-bold mb-8 text-center text-[#BB2B29] dark:text-[#F5F5F5]">
          Donation Request Details
        </h2>
      <div className="w-full max-w-xl mx-auto bg-white dark:bg-[#273a57] rounded-2xl shadow-lg p-8">  
        <div className="space-y-4 text-lg">
          <div><span className="font-bold text-[#BB2B29] dark:text-[#FFE8E8]">Recipient Name:</span> <span className="ml-2 text-[#530404] dark:text-[#FFE8E8]">{request.recipientName}</span></div>
          <div><span className="font-bold text-[#BB2B29] dark:text-[#FFE8E8]">Location:</span> <span className="ml-2 text-[#530404] dark:text-[#FFE8E8]">{request.recipientDistrict}, {request.recipientUpazila}</span></div>
          <div><span className="font-bold text-[#BB2B29] dark:text-[#FFE8E8]">Blood Group:</span> <span className="ml-2 text-[#530404] dark:text-[#BB2B29] font-bold text-xl">{request.bloodGroup}</span></div>
          <div><span className="font-bold text-[#BB2B29] dark:text-[#FFE8E8]">Date:</span> <span className="ml-2 text-[#530404] dark:text-[#FFE8E8]">{request.donationDate}</span></div>
          <div><span className="font-bold text-[#BB2B29] dark:text-[#FFE8E8]">Time:</span> <span className="ml-2 text-[#530404] dark:text-[#FFE8E8]">{request.donationTime}</span></div>
          {/* Add more fields as needed */}
        </div>
        <div className="flex justify-center mt-8">
          {request.donationStatus === "pending" && (
            <button
              className="btn bg-[#E53935] text-white font-bold px-8 py-2 rounded-lg hover:bg-[#bb2b29] transition"
              onClick={() => setShowModal(true)}
            >
              Donate
            </button>
          )}
        </div>
        {/* Donate Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white dark:bg-[#273a57] rounded-2xl shadow-lg p-8 w-full max-w-md">
              <h3 className="text-2xl font-bold mb-4 text-[#BB2B29] dark:text-[#FFE8E8] text-center">Confirm Donation</h3>
              <form onSubmit={handleDonate} className="space-y-4">
                <input
                  type="text"
                  value={user.displayName}
                  readOnly
                  className="w-full bg-[#f5f5f5] rounded-lg py-4 px-4 text-[#530404] focus:outline-none"
                  placeholder="Donor Name"
                />
                <input
                  type="email"
                  value={user.email}
                  readOnly
                  className="w-full bg-[#f5f5f5] rounded-lg py-4 px-4 text-[#530404] focus:outline-none"
                  placeholder="Donor Email"
                />
                <button
                  type="submit"
                  className="w-full py-4 rounded-lg bg-[#bb2b29] text-white font-bold uppercase tracking-wider text-lg hover:bg-[#E53935] transition"
                >
                  Confirm
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="w-full py-4 rounded-lg bg-[#bb2b29] text-white font-bold uppercase tracking-wider text-lg hover:bg-[#E53935] transition mt-2"
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationRequestDetails;