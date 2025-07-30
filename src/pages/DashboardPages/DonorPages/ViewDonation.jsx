import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/ExtraComponents/Loading";

const ViewDonationRequest = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [request, setRequest] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axiosSecure.get(`/donation-requests/${id}`).then(res => setRequest(res.data));
  }, [id, axiosSecure]);

  if (!request) return  <Loading></Loading>;

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-[#530404]/80 to-[#FFE8E8] dark:from-[#0F172A] dark:to-[#000000] text-white py-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-[#FFE8E8]">
        Donation Request Details
      </h2>
      <div className="w-full max-w-xl bg-white dark:bg-[#273a57] rounded-2xl shadow-lg p-8">
        <div className="space-y-4 text-base">
          <div>
            <span className="font-bold text-[#BB2B29] dark:text-[#FFE8E8]">Recipient Name:</span>
            <span className="ml-2 text-[#530404] dark:text-[#FFE8E8]">{request.recipientName}</span>
          </div>
          <div>
            <span className="font-bold text-[#BB2B29] dark:text-[#FFE8E8]">Recipient Location:</span>
            <span className="ml-2 text-[#530404] dark:text-[#FFE8E8]">{request.recipientDistrict}, {request.recipientUpazila}</span>
          </div>
          <div>
            <span className="font-bold text-[#BB2B29] dark:text-[#FFE8E8]">Hospital:</span>
            <span className="ml-2 text-[#530404] dark:text-[#FFE8E8]">{request.hospitalName}</span>
          </div>
          <div>
            <span className="font-bold text-[#BB2B29] dark:text-[#FFE8E8]">Address:</span>
            <span className="ml-2 text-[#530404] dark:text-[#FFE8E8]">{request.addressLine}</span>
          </div>
          <div>
            <span className="font-bold text-[#BB2B29] dark:text-[#FFE8E8]">Blood Group:</span>
            <span className="ml-2 text-[#530404] dark:text-[#FFE8E8]">{request.bloodGroup}</span>
          </div>
          <div>
            <span className="font-bold text-[#BB2B29] dark:text-[#FFE8E8]">Date:</span>
            <span className="ml-2 text-[#530404] dark:text-[#FFE8E8]">{request.donationDate}</span>
          </div>
          <div>
            <span className="font-bold text-[#BB2B29] dark:text-[#FFE8E8]">Time:</span>
            <span className="ml-2 text-[#530404] dark:text-[#FFE8E8]">{request.donationTime}</span>
          </div>
          <div>
            <span className="font-bold text-[#BB2B29] dark:text-[#FFE8E8]">Status:</span>
            <span className="ml-2 text-[#530404] dark:text-[#FFE8E8]">{request.donationStatus}</span>
          </div>
          <div>
            <span className="font-bold text-[#BB2B29] dark:text-[#FFE8E8]">Request Message:</span>
            <span className="ml-2 text-[#530404] dark:text-[#FFE8E8]">{request.requestMessage}</span>
          </div>
          {request.donorInfo && (
            <div>
              <span className="font-bold text-[#BB2B29] dark:text-[#FFE8E8]">Donor Info:</span>
              <span className="ml-2 text-[#530404] dark:text-[#FFE8E8]">
                {request.donorInfo.name} ({request.donorInfo.email})
              </span>
            </div>
          )}
        </div>
        <div className="flex justify-center mt-8">
          <button
            className="btn bg-[#BB2B29] text-white dark:bg-[#FFE8E8] dark:text-[#530404] font-bold px-8 py-2 rounded-lg hover:bg-[#ECAAA0] hover:text-[#530404] transition"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewDonationRequest;