import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBooks: 0,
    totalRequest: 0,
  });

  const axiosSecure = useAxiosSecure();

  const [latestRequests, setLatestRequests] = useState([]);

  useEffect(() => {
    // Replace with your secure APIs
    axiosSecure("/admin-dashboard-stats").then(({data}) => setStats(data));

    // fetch("/api/latest-requests?limit=5")
    //   .then((res) => res.json())
    //   .then((data) => setLatestRequests(data));
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-3xl font-bold text-blue-600">👋 Welcome, Admin</h2>

      {/* Stats Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Users" value={stats.totalUsers} />
        <StatCard title="Total Books" value={stats.totalBooks} />
        <StatCard
          title="Total Book Requested"
          value={`${stats.totalRequest}`}
        />
      </div>

      {/* Latest Book Requests Table */}
      <div className="bg-white shadow-md rounded-xl p-5">
        <h3 className="text-xl font-semibold mb-4">📦 Latest Book Requests</h3>
        <div className="overflow-x-auto">
          {/* <table className="min-w-full text-sm text-left border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2">#</th>
                <th className="p-2">Requester</th>
                <th className="p-2">Book</th>
                <th className="p-2">Status</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {latestRequests.length > 0 ? (
                latestRequests.map((req, i) => (
                  <tr key={req._id} className="border-t hover:bg-gray-50">
                    <td className="p-2">{i + 1}</td>
                    <td className="p-2">{req.requesterName}</td>
                    <td className="p-2">{req.bookTitle}</td>
                    <td className="p-2 capitalize">{req.status}</td>
                    <td className="p-2">
                      <button
                        className="text-blue-600 underline"
                        onClick={() =>
                          (window.location.href = `/dashboard/request/${req._id}`)
                        }
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center p-4 text-gray-400">
                    No recent requests
                  </td>
                </tr>
              )}
            </tbody>
          </table> */}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value }) => (
  <div className="bg-white shadow-md rounded-xl p-6 flex items-center gap-4">
    <div className="bg-blue-100 text-blue-600 p-3 rounded-full">icon</div>
    <div>
      <p className="text-lg font-semibold">{value}</p>
      <p className="text-sm text-gray-500">{title}</p>
    </div>
  </div>
);

export default AdminDashboard;
