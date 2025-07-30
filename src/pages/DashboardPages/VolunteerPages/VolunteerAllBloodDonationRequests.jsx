import { useEffect, useState, Fragment } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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
        setLoading(false);
      });
  }, [status, page]);

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

  // Skeletons for loading
  const skeletonCards = Array.from({ length: 4 }).map((_, idx) => (
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
                  <div className="text-[#530404] dark:text-[#FFE8E8] text-sm">
                    Donor: {Array.isArray(req.donorInfo) && req.donorInfo.length > 0
                      ? req.donorInfo.map((d, i) => <span key={i}>{d.name}{i < req.donorInfo.length - 1 ? ", " : ""}</span>)
                      : "-"}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
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
                </div>
              ))}
          </div>
        </div>

        {/* Table view for md+ */}
        <div className="hidden md:block">
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
              {loading
                ? Array.from({ length: 6 }).map((_, idx) => (
                  <tr key={idx}>
                    <td colSpan={8}><Skeleton height={40} /></td>
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
                    <td className="py-3 px-2 md:px-4 ">
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
                      {Array.isArray(req.donorInfo) && req.donorInfo.length > 0
                        ? req.donorInfo.map((d, i) => <span key={i}>{d.name}{i < req.donorInfo.length - 1 ? ", " : ""}</span>)
                        : "-"}
                    </td>
                    <td className="py-3 px-2 md:px-4 z-50">
                      <div className="flex flex-wrap gap-1">
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

export default VolunteerAllBloodDonationRequests;