import { useEffect, useState, useContext, useMemo } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { FaRegEye } from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProvider";
import { motion, AnimatePresence } from "framer-motion";

const itemsPerPage = 9; // 3x3 on lg per page

const SkeletonCard = () => (
  <div className="rounded-xl bg-white/60 dark:bg-slate-800/60 ring-1 ring-black/5 dark:ring-white/10 p-4 animate-pulse">
    <div className="h-5 w-2/3 bg-gray-200 dark:bg-slate-700 rounded mb-3" />
    <div className="h-4 w-1/2 bg-gray-200 dark:bg-slate-700 rounded mb-2" />
    <div className="h-4 w-24 bg-gray-200 dark:bg-slate-700 rounded mb-2" />
    <div className="h-4 w-1/3 bg-gray-200 dark:bg-slate-700 rounded mb-2" />
    <div className="h-4 w-1/4 bg-gray-200 dark:bg-slate-700 rounded mb-4" />
    <div className="h-10 w-full bg-gray-200 dark:bg-slate-700 rounded" />
  </div>
);

// Framer Motion variants
const cardVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.25, ease: "easeOut" } },
  exit: { opacity: 0, y: -12, scale: 0.98, transition: { duration: 0.2, ease: "easeIn" } },
};

const PendingDonationRequests = () => {
  const [requests, setRequests] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

  // Fetch requests
  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");

    axios
      .get("https://blood-donation-server-umber-iota.vercel.app/search-donation-requests")
      .then((res) => {
        if (!active) return;
        setRequests(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error(err);
        if (active) setError("Failed to load requests.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  // Redirect to login if not logged in
  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  // Only pending requests
  const pendingRequests = useMemo(
    () => requests.filter((r) => r?.donationStatus?.toLowerCase() === "pending"),
    [requests]
  );

  // Pagination
  const totalPages = Math.max(1, Math.ceil(pendingRequests.length / itemsPerPage));
  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages, page]);

  const start = (page - 1) * itemsPerPage;
  const paginated = pendingRequests.slice(start, start + itemsPerPage);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#87CEEB]/60 via-white/50 to-white dark:from-[#14274E]/85 dark:via-slate-900/60 dark:to-slate-700 transition-colors duration-300 p-4 py-10">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-2xl md:text-3xl font-extrabold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#BB2B29] to-[#530404] dark:from-[#FFE8E8] dark:to-[#BB2B29]"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          Pending Donation Requests
        </motion.h2>

        {error && (
          <div className="max-w-3xl mx-auto mb-4 text-center text-red-600 font-medium" role="alert">
            {error}
          </div>
        )}

        {/* Grid 1/2/3 cols */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Skeletons while loading */}
          {loading &&
            Array.from({ length: itemsPerPage }).map((_, idx) => <SkeletonCard key={idx} />)}

          {/* Real cards */}
          {!loading && pendingRequests.length === 0 && (
            <div className="col-span-full text-center text-[#BB2B29] font-semibold">
              No pending requests found.
            </div>
          )}

          {!loading && pendingRequests.length > 0 && (
            <AnimatePresence mode="popLayout">
              {paginated.map((req) => (
                <motion.div
                  key={req._id}
                  layout
                  variants={cardVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  whileHover={{ y: -3, boxShadow: "0 10px 24px rgba(0,0,0,0.08)" }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-[#FFE8E8] dark:bg-[#1a2233] rounded-xl shadow p-4 flex flex-col gap-2 ring-1 ring-black/5 dark:ring-white/10"
                >
                  <div className="font-bold text-[#530404] dark:text-[#FFE8E8] text-lg">
                    {req.recipientName}
                  </div>
                  <div className="text-[#530404] dark:text-[#FFE8E8] text-sm">
                    {req.recipientDistrict}, {req.recipientUpazila}
                  </div>
                  <div className="text-[#BB2B29] dark:text-[#ECAAA0] text-sm">{req.bloodGroup}</div>
                  <div className="text-[#530404] dark:text-[#FFE8E8] text-sm">
                    Date: {req.donationDate}
                  </div>
                  <div className="text-[#530404] dark:text-[#FFE8E8] text-sm">
                    Time: {req.donationTime}
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    className="mt-2 flex items-center gap-2 justify-center bg-[#E53935] text-white font-bold rounded-lg py-2 px-4 uppercase tracking-wider hover:bg-[#bb2b29] transition"
                    onClick={() => navigate(`/donation-request/${req._id}`)}
                  >
                    <FaRegEye /> View
                  </motion.button>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-2">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className={`px-3 py-2 rounded-lg border text-sm font-medium transition
                ${page === 1
                  ? "opacity-50 cursor-not-allowed border-gray-300 text-gray-400"
                  : "border-[#ECAAA0] text-[#530404] hover:bg-[#FFE8E8] dark:text-[#F5F5F5] dark:border-[#530404] dark:hover:bg-[#273a57]"
                }`}
            >
              Prev
            </motion.button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <motion.button
                key={n}
                whileTap={{ scale: 0.97 }}
                onClick={() => setPage(n)}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition
                  ${page === n
                    ? "bg-[#BB2B29] text-[#FFE8E8] shadow"
                    : "text-[#530404] dark:text-[#F5F5F5] hover:bg-[#FFE8E8] dark:hover:bg-[#273a57] border border-transparent"
                  }`}
                aria-current={page === n ? "page" : undefined}
              >
                {n}
              </motion.button>
            ))}

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className={`px-3 py-2 rounded-lg border text-sm font-medium transition
                ${page === totalPages
                  ? "opacity-50 cursor-not-allowed border-gray-300 text-gray-400"
                  : "border-[#ECAAA0] text-[#530404] hover:bg-[#FFE8E8] dark:text-[#F5F5F5] dark:border-[#530404] dark:hover:bg-[#273a57]"
                }`}
            >
              Next
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingDonationRequests;