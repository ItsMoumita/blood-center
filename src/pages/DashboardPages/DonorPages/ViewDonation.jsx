import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ViewDonationRequest = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [request, setRequest] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axiosSecure.get(`/donation-requests/${id}`).then(res => setRequest(res.data));
  }, [id, axiosSecure]);

  if (!request) return <div>Loading...</div>;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Donation Request Details</h2>
      <div className="space-y-2">
        <div><b>Recipient Name:</b> {request.recipientName}</div>
        <div><b>Recipient Location:</b> {request.recipientDistrict}, {request.recipientUpazila}</div>
        <div><b>Hospital:</b> {request.hospitalName}</div>
        <div><b>Address:</b> {request.addressLine}</div>
        <div><b>Blood Group:</b> {request.bloodGroup}</div>
        <div><b>Date:</b> {request.donationDate}</div>
        <div><b>Time:</b> {request.donationTime}</div>
        <div><b>Status:</b> {request.donationStatus}</div>
        <div><b>Request Message:</b> {request.requestMessage}</div>
        {request.donorInfo && (
          <div>
            <b>Donor Info:</b> {request.donorInfo.name} ({request.donorInfo.email})
          </div>
        )}
      </div>
      <button className="btn mt-4" onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default ViewDonationRequest;