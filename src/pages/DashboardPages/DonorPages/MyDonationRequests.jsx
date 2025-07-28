// src/pages/DashboardPages/MyDonationRequests.jsx
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router";

const statusOptions = ["all", "pending", "inprogress", "done", "canceled"];

const MyDonationRequests = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [requests, setRequests] = useState([]);
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/donation-requests?email=${user.email}&status=${status}&page=${page}&limit=${limit}`)
        .then((res) => {
          setRequests(res.data.requests);
          setTotal(res.data.total);
        });
    }
  }, [user, status, page, axiosSecure]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Donation Requests</h2>
      <div className="mb-2">
        <label>Status: </label>
        <select value={status} onChange={e => { setStatus(e.target.value); setPage(1); }}>
          {statusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      </div>
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
      {/* Pagination */}
      <div className="mt-4 flex gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`btn btn-xs ${page === i + 1 ? "btn-active" : ""}`}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MyDonationRequests;