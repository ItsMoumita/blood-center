import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/ExtraComponents/Loading";

const statusOptions = ["all", "pending", "inprogress", "done", "canceled"];

const VolunteerAllBloodDonationRequests = () => {
  const axiosSecure = useAxiosSecure();
  const [requests, setRequests] = useState([]);
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);  
  const [loading, setLoading] = useState(false);
  const limit = 10;

  useEffect(() => {
    setLoading(true);
    axiosSecure
      .get(`/admin/donation-requests?status=${status}&page=${page}&limit=${limit}`)
      .then((res) => {
        setRequests(res.data.requests);
        setTotal(res.data.total);
      });
      setLoading(false);
  }, [status, page]);
console.log(requests);
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

  if(loading) return <Loading></Loading>

  return (
    <div className="p-2 sm:p-4 min-h-screen w-full bg-gradient-to-b from-[#530404]/80 to-[#FFE8E8] dark:from-[#0F172A] dark:to-[#000000] text-white transition-colors duration-300">
      <div className="w-full max-w-6xl mx-auto mt-4">
        <h2 className="text-2xl font-extrabold text-[#FFE8E8] tracking-tight mb-6">
          All Blood Donation Requests
        </h2>
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center gap-2">
          <label className="text-[#FFE8E8] font-semibold">Status:</label>
          <select
            value={status}
            onChange={e => { setStatus(e.target.value); setPage(1); }}
            className="select select-bordered w-full sm:w-48 bg-white dark:bg-[#f3f3f3] text-[#530404] dark:text-[#BB2B29] border-[#BB2B29] dark:border-[#FFE8E8]"
          >
            {statusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
        <div className="w-full">
          <table className="w-full">
            <thead>
              <tr className="bg-[#FFE8E8] dark:bg-[#530404]">
                <th className="py-3 px-4 text-left text-[#BB2B29] dark:text-[#FFE8E8] font-semibold">Recipient</th>
                <th className="py-3 px-4 text-left text-[#BB2B29] dark:text-[#FFE8E8] font-semibold">Location</th>
                <th className="py-3 px-4 text-left text-[#BB2B29] dark:text-[#FFE8E8] font-semibold">Date</th>
                <th className="py-3 px-4 text-left text-[#BB2B29] dark:text-[#FFE8E8] font-semibold">Time</th>
                <th className="py-3 px-4 text-left text-[#BB2B29] dark:text-[#FFE8E8] font-semibold">Blood Group</th>
                <th className="py-3 px-4 text-left text-[#BB2B29] dark:text-[#FFE8E8] font-semibold">Status</th>
                <th className="py-3 px-4 text-left text-[#BB2B29] dark:text-[#FFE8E8] font-semibold">Donor Info</th>
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
                  <td className="py-3 px-2 md:px-4 text-white dark:text-[#FFE8E8]">
                    {req.donorInfo ? (
                      <div>
                        {req.donorInfo[0].name} 
                      </div>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="py-3 px-2 md:px-4 z-50">
                    <div className="flex flex-wrap gap-1">
                      {/* Only show status update buttons for volunteers */}
                      {req.donationStatus === "inprogress" && (
                        <>
                          <button className="btn btn-xs bg-white text-[#BB2B29] border-none hover:bg-[#ECAAA0]" onClick={() => handleStatusChange(req._id, "done")}>
                            Done
                          </button>
                          <button className="btn btn-xs bg-white text-[#BB2B29] border-none hover:bg-[#ECAAA0]" onClick={() => handleStatusChange(req._id, "canceled")}>
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
        {/* Pagination */}
        <div className="mt-8 md:mt-16 flex flex-wrap gap-2 justify-center">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`btn btn-s rounded-xl font-bold border-none ${
                page === i + 1
                  ? "bg-white/70 text-[#BB2B29] dark:bg-[#FFE8E8] dark:text-[#530404]"
                  : "bg-[#ECAAA0] text-[#530404] dark:bg-[#BB2B29] dark:text-[#FFE8E8]"
              }`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VolunteerAllBloodDonationRequests;