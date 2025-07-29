import { useContext, useEffect, useState, Fragment } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router";
import { FaRegEye } from "react-icons/fa";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";

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
  }, [user, status, page]);

  const totalPages = Math.ceil(total / limit);

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
    <div className="p-2 sm:p-4 min-h-screen w-full bg-gradient-to-b from-[#530404]/80 to-[#FFE8E8] dark:from-[#0F172A] dark:to-[#000000] text-white transition-colors duration-300">
      <div className="w-full max-w-6xl mx-auto mt-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
          <h2 className="text-2xl font-extrabold text-[#FFE8E8] tracking-tight">
            My Donation Requests
          </h2>
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
                      <button
                        className="btn btn-xs bg-white text-[#BB2B29] border-none text-xl hover:bg-[#ECAAA0]"
                        onClick={() => handleDelete(req._id)}
                      >
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
        {/* Pagination */}
        <div className="mt-8 md:mt-16 flex flex-wrap gap-2 justify-center">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`btn btn-s rounded-xl font-bold border-none ${page === i + 1
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

export default MyDonationRequests;