// src/pages/DashboardPages/AllBloodDonationRequests.jsx
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const statusOptions = ["all", "pending", "inprogress", "done", "canceled"];

const AllBloodDonationRequests = () => {
  const axiosSecure = useAxiosSecure();
  const [requests, setRequests] = useState([]);
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  useEffect(() => {
    axiosSecure
      .get(`/admin/donation-requests?status=${status}&page=${page}&limit=${limit}`)
      .then((res) => {
        setRequests(res.data.requests);
        setTotal(res.data.total);
      });
  }, [status, page, axiosSecure]);

  const totalPages = Math.ceil(total / limit);

  const handleStatusChange = async (id, newStatus) => {
    await axiosSecure.patch(`/donation-requests/${id}/status`, { status: newStatus });
    setRequests((prev) =>
      prev.map((req) =>
        req._id === id ? { ...req, donationStatus: newStatus } : req
      )
    );
    Swal.fire("Success", `Status updated to ${newStatus}`, "success");
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#BB2B29",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.delete(`/donation-requests/${id}`);
        setRequests((prev) => prev.filter((req) => req._id !== id));
        Swal.fire("Deleted!", "Request has been deleted.", "success");
      }
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">All Blood Donation Requests</h2>
      <div className="mb-2 flex flex-wrap gap-2 items-center">
        <label>Status: </label>
        <select value={status} onChange={e => { setStatus(e.target.value); setPage(1); }}>
          {statusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      </div>
      <div className="overflow-x-auto rounded-xl shadow bg-white dark:bg-[#2d2d2d]">
        <table className="min-w-full">
          <thead>
            <tr>
              <th>Recipient</th>
              <th>Location</th>
              <th>Date</th>
              <th>Time</th>
              <th>Blood Group</th>
              <th>Status</th>
              <th>Donor Info</th>
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
                <td>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${req.donationStatus === "pending" ? "bg-yellow-100 text-yellow-700" : req.donationStatus === "inprogress" ? "bg-blue-100 text-blue-700" : req.donationStatus === "done" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {req.donationStatus}
                  </span>
                </td>
                <td>
                  {req.donorInfo ? (
                    <div>
                      {req.donorInfo.name} <br /> {req.donorInfo.email}
                    </div>
                  ) : (
                    "-"
                  )}
                </td>
                <td>
                  <Link to={`/dashboard/donation-request/${req._id}`} className="btn btn-xs">View</Link>
                  <Link to={`/dashboard/edit-donation-request/${req._id}`} className="btn btn-xs ml-1">Edit</Link>
                  <button className="btn btn-xs ml-1" onClick={() => handleDelete(req._id)}>Delete</button>
                  {req.donationStatus === "inprogress" && (
                    <>
                      <button className="btn btn-xs ml-1" onClick={() => handleStatusChange(req._id, "done")}>Done</button>
                      <button className="btn btn-xs ml-1" onClick={() => handleStatusChange(req._id, "canceled")}>Cancel</button>
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

export default AllBloodDonationRequests;