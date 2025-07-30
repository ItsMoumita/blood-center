import { Fragment, useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaEllipsisV, FaUserShield, FaUserCheck, FaUserTimes, FaUserEdit } from "react-icons/fa";
import { Menu, Transition } from "@headlessui/react";
import Loading from "../../../components/ExtraComponents/Loading";

const statusOptions = ["all", "active", "blocked"];

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const[loading, setLoading] = useState(false);
  const limit = 10;

  useEffect(() => {
    setLoading(true)
    axiosSecure
      .get(`/users?status=${status}&page=${page}&limit=${limit}`)
      .then((res) => {
        setUsers(res.data.users);
        setTotal(res.data.total);
      });
    setLoading(false);

  }, [status, page]);

  const totalPages = Math.ceil(total / limit);

  const handleAction = async (id, action, value) => {
    if (action === "status") {
      await axiosSecure.patch(`/users/${id}/status`, { status: value });
    } else if (action === "role") {
      await axiosSecure.patch(`/users/${id}/role`, { role: value });
    }
    // Refresh
    axiosSecure
      .get(`/users?status=${status}&page=${page}&limit=${limit}`)
      .then((res) => {
        setUsers(res.data.users);
        setTotal(res.data.total);
      });
  };

  if(loading) return <Loading></Loading>
  return (
    <div className="p-2 sm:p-4 min-h-screen w-full bg-gradient-to-b from-[#530404]/80 to-[#FFE8E8] dark:from-[#0F172A] dark:to-[#000000] text-white transition-colors duration-300">
      <div className="w-full max-w-6xl mx-auto mt-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
          <h2 className="text-2xl font-extrabold text-[#FFE8E8] tracking-tight">
            All Users
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
          <table className="w-full ">
            <thead >
              <tr className="bg-[#FFE8E8] dark:bg-[#530404]">
                <th className="py-3 px-2 md:px-4 text-left text-[#BB2B29] dark:text-[#FFE8E8] font-semibold">User</th>
                <th className="py-3 px-2 md:px-4 text-left text-[#BB2B29] dark:text-[#FFE8E8] font-semibold">Email</th>
                <th className="py-3 px-2 md:px-4 text-left text-[#BB2B29] dark:text-[#FFE8E8] font-semibold">Role</th>
                <th className="py-3 px-2 md:px-4 text-left text-[#BB2B29] dark:text-[#FFE8E8] font-semibold">Status</th>
                <th className="py-3 px-2 md:px-4 text-left text-[#BB2B29] dark:text-[#FFE8E8] font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="group border-b border-b-[#FFE8E8]">
                  <td className="py-3 px-2 md:px-4">
                    <div className="flex flex-col md:flex-row items-center gap-1 md:gap-3">
                      <img src={u.photo} alt="avatar" className="w-10 h-10 rounded-full border-2 border-[#BB2B29] dark:border-[#FFE8E8]" />
                      <div>
                        <div className="font-semibold text-[#FFE8E8]">{u.name.charAt(0).toUpperCase() + u.name.slice(1)}</div>
                       
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-2 md:px-4  text-[#FFE8E8] break-all">{u.email}</td>
                  <td className="py-3 px-2 md:px-4">
                    <span className="capitalize px-3 py-1 rounded-full bg-[#ECAAA0]/60 dark:bg-[#BB2B29]/60 text-[#530404] dark:text-[#FFE8E8] font-semibold">
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3 px-2 md:px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${u.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                      }`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="py-3 px-2 md:px-4 z-50">
                    <div className="flex justify-start">
                      <Menu as="div" className="relative inline-block text-left">
                        <Menu.Button className="p-2 rounded-full hover:bg-[#ECAAA0]/60 dark:hover:bg-[#BB2B29]/60 transition focus:outline-none">
                          <FaEllipsisV className="text-[#FFE8E8]" />
                        </Menu.Button>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items
                            className="absolute right-0 top-full mb-2 z-50 w-44 origin-top-right rounded-xl bg-white dark:bg-[#273a57] shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none border border-[#ECAAA0] dark:border-[#BB2B29]"
                          >
                            <div className="py-1">
                              {u.status === "active" ? (
                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      onClick={() => handleAction(u._id, "status", "blocked")}
                                      className={`${
                                        active ? "bg-[#ECAAA0] text-[#BB2B29]" : "text-[#530404] dark:text-[#FFE8E8]"
                                      } group flex items-center px-4 py-2 text-sm w-full`}
                                    >
                                      <FaUserTimes className="mr-2" /> Block
                                    </button>
                                  )}
                                </Menu.Item>
                              ) : (
                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      onClick={() => handleAction(u._id, "status", "active")}
                                      className={`${
                                        active ? "bg-[#ECAAA0] text-[#BB2B29]" : "text-[#530404] dark:text-[#FFE8E8]"
                                      } group flex items-center px-4 py-2 text-sm w-full`}
                                    >
                                      <FaUserCheck className="mr-2" /> Unblock
                                    </button>
                                  )}
                                </Menu.Item>
                              )}
                              {u.role !== "volunteer" && (
                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      onClick={() => handleAction(u._id, "role", "volunteer")}
                                      className={`${
                                        active ? "bg-[#ECAAA0] text-[#BB2B29]" : "text-[#530404] dark:text-[#FFE8E8]"
                                      } group flex items-center px-4 py-2 text-sm w-full`}
                                    >
                                      <FaUserEdit className="mr-2" /> Make Volunteer
                                    </button>
                                  )}
                                </Menu.Item>
                              )}
                              {u.role !== "admin" && (
                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      onClick={() => handleAction(u._id, "role", "admin")}
                                      className={`${
                                        active ? "bg-[#ECAAA0] text-[#BB2B29]" : "text-[#530404] dark:text-[#FFE8E8]"
                                      } group flex items-center px-4 py-2 text-sm w-full`}
                                    >
                                      <FaUserShield className="mr-2" /> Make Admin
                                    </button>
                                  )}
                                </Menu.Item>
                              )}
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
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
        
      </style>
    </div>
  );
};

export default AllUsers;