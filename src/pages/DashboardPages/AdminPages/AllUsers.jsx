// src/pages/DashboardPages/AllUsers.jsx
import { Fragment, useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaEllipsisV, FaUserShield, FaUserCheck, FaUserTimes, FaUserEdit } from "react-icons/fa";
import { Menu, Transition } from "@headlessui/react"; // npm i @headlessui/react

const statusOptions = ["all", "active", "blocked"];

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  useEffect(() => {
    axiosSecure
      .get(`/users?status=${status}&page=${page}&limit=${limit}`)
      .then((res) => {
        setUsers(res.data.users);
        setTotal(res.data.total);
      });
  }, [status, page, axiosSecure]);

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

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">All Users</h2>
        <select value={status} onChange={e => { setStatus(e.target.value); setPage(1); }}>
          {statusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-xl bg-white dark:bg-[#2d2d2d]">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Email</th>
              <th>Name</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>
                  <img src={u.photo } alt="avatar" className="w-10 h-10 rounded-full" />
                </td>
                <td>{u.email}</td>
                <td>{u.name}</td>
                <td>{u.role}</td>
                <td>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${u.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {u.status}
                  </span>
                </td>
                <td>
                  <Menu as="div" className="relative inline-block text-left">
                    <Menu.Button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-[#BB2B29]">
                      <FaEllipsisV />
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
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-md bg-white dark:bg-[#2d2d2d] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          {u.status === "active" ? (
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={() => handleAction(u._id, "status", "blocked")}
                                  className={`${
                                    active ? "bg-[#ECAAA0] text-[#BB2B29]" : "text-[#530404]"
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
                                    active ? "bg-[#ECAAA0] text-[#BB2B29]" : "text-[#530404]"
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
                                    active ? "bg-[#ECAAA0] text-[#BB2B29]" : "text-[#530404]"
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
                                    active ? "bg-[#ECAAA0] text-[#BB2B29]" : "text-[#530404]"
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

export default AllUsers;