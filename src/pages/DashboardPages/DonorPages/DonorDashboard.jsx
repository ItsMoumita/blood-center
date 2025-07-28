// src/pages/DashboardPages/Dashboard.jsx
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const DonorDashboard = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/donation-requests/recent?email=${user.email}`)
        .then((res) => setRequests(res.data));
    }
  }, [user, axiosSecure]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Welcome, {user?.displayName || "Donor"}!</h2>
      {requests.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Your Recent Donation Requests</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border">
              <thead>
                <tr>
                  <th>Recipient Name</th>
                  <th>Location</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Blood Group</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <tr key={req._id}>
                    <td>{req.recipientName}</td>
                    <td>{req.recipientDistrict}, {req.recipientUpazila}</td>
                    <td>{req.donationDate}</td>
                    <td>{req.donationTime}</td>
                    <td>{req.bloodGroup}</td>
                    <td>{req.donationStatus}</td>
                    <td>
                      <Link to={`/dashboard/donation-request/${req._id}`} className="btn btn-xs">View</Link>
                      <Link to={`/dashboard/edit-donation-request/${req._id}`} className="btn btn-xs ml-1">Edit</Link>
                      <button className="btn btn-xs ml-1" onClick={() => {/* handle delete */}}>Delete</button>
                      {/* Show Done/Cancel if inprogress */}
                      {req.donationStatus === "inprogress" && (
                        <>
                          <button className="btn btn-xs ml-1" onClick={() => {/* handle done */}}>Done</button>
                          <button className="btn btn-xs ml-1" onClick={() => {/* handle cancel */}}>Cancel</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Link to="/dashboard/my-donation-requests" className="btn mt-4">View My All Requests</Link>
        </div>
      )}
      {requests.length === 0 && (
        <div className="text-gray-500 mt-8">You have not made any donation requests yet.</div>
      )}
    </div>
  );
};

export default DonorDashboard;