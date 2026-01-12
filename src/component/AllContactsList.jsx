import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "./layout/AdminLayout";

import {
  getAllContactsThunk,
  deleteContactThunk,
  toggleContactStatusThunk,
} from "../store/slices/contactSlice";

/* ------------------------
   Skeleton Loader Component
------------------------- */
const ContactSkeleton = () => {
  return (
    <>
      {Array.from({ length: 8 }).map((_, i) => (
        <tr key={i} className="animate-pulse border-b">
          <td className="p-3 border">
            <div className="h-4 w-32 bg-gray-200 rounded"></div>
          </td>
          <td className="p-3 border">
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
          </td>
          <td className="p-3 border">
            <div className="h-4 w-36 bg-gray-200 rounded"></div>
          </td>
          <td className="p-3 border">
            <div className="h-4 w-20 bg-gray-200 rounded"></div>
          </td>
          <td className="p-3 border">
            <div className="h-4 w-40 bg-gray-200 rounded"></div>
          </td>
          <td className="p-3 border">
            <div className="h-4 w-16 bg-gray-200 rounded"></div>
          </td>
          <td className="p-3 border">
            <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
          </td>
          <td className="p-3 border text-center">
            <div className="h-8 w-16 bg-gray-200 rounded mx-auto"></div>
          </td>
        </tr>
      ))}
    </>
  );
};

const AllContactsList = () => {
  const dispatch = useDispatch();
  const { contacts, loading } = useSelector((state) => state.contacts);

  const [statusLoadingId, setStatusLoadingId] = useState(null);

  /* -----------------------
         PAGINATION
  ------------------------- */
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const totalItems = contacts?.length || 0;
  const totalPages = Math.ceil(totalItems / pageSize);

  const paginatedContacts = contacts?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const changePage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // Load all contacts
  useEffect(() => {
    dispatch(getAllContactsThunk());
  }, [dispatch]);

  // Delete Contact
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this enquiry?")) {
      dispatch(deleteContactThunk({ id }));
    }
  };

  // Toggle Status (New → Seen → Resolved)
  const handleStatus = async (contact) => {
    setStatusLoadingId(contact._id);
    await dispatch(toggleContactStatusThunk({ id: contact._id }));
    setStatusLoadingId(null);
  };

  return (
    <AdminLayout>
      <div className="bg-white shadow-xl rounded-xl p-6 w-full">

        {/* HEADER */}
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Contact Enquiries
        </h2>

        {/* TABLE */}
        <div className="overflow-x-auto rounded-lg border border-gray-300 shadow">

          <table className="w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100 text-gray-700 font-semibold text-left border-b border-gray-300">
                <th className="p-3 border-r border-gray-300">Name</th>
                <th className="p-3 border-r border-gray-300">Mobile</th>
                <th className="p-3 border-r border-gray-300">Email</th>
                <th className="p-3 border-r border-gray-300">Subject</th>
                <th className="p-3 border-r border-gray-300">Message</th>
                <th className="p-3 border-r border-gray-300">Captcha</th>
                <th className="p-3 border-r border-gray-300">Status</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <ContactSkeleton />
              ) : paginatedContacts?.length > 0 ? (
                paginatedContacts.map((c, index) => (
                  <tr
                    key={c._id}
                    className="hover:bg-gray-50 transition border-b border-gray-300"
                  >
                    {/* NAME */}
                    <td className="p-3 border-r border-gray-300 capitalize">
                      {c.name}
                    </td>

                    {/* MOBILE */}
                    <td className="p-3 border-r border-gray-300">{c.mobile}</td>

                    {/* EMAIL */}
                    <td className="p-3 border-r border-gray-300">{c.email}</td>

                    {/* SUBJECT */}
                    <td className="p-3 border-r border-gray-300">
                      {c.subject?.length > 20
                        ? c.subject.slice(0, 20) + "..."
                        : c.subject}
                    </td>

                    {/* MESSAGE */}
                    <td className="p-3 border-r border-gray-300">
                      {c.message?.length > 30
                        ? c.message.slice(0, 30) + "..."
                        : c.message}
                    </td>

                    {/* CAPTCHA */}
                    <td className="p-3 border-r border-gray-300">
                      {c.captcha}
                    </td>

                    {/* STATUS */}
                    <td className="p-3 border-r border-gray-300 text-center">
                      {statusLoadingId === c._id ? (
                        <div className="w-6 h-6 border-2 border-pink-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                      ) : (
                        <span
                          onClick={() => handleStatus(c)}
                          className={`px-3 py-1 rounded-lg text-sm font-medium cursor-pointer transition
                            ${
                              c.status === "New"
                                ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                                : c.status === "Seen"
                                ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                                : "bg-green-100 text-green-700 hover:bg-green-200"
                            }`}
                        >
                          {c.status}
                        </span>
                      )}
                    </td>

                    {/* DELETE */}
                    <td className="p-3 text-center">
                      <button
                        onClick={() => handleDelete(c._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm shadow-md transition cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-6 text-center text-gray-500">
                    No contacts found
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>

        {/* -----------------------------------
              PAGINATION UI
        ------------------------------------ */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-6">

            {/* Prev */}
            <button
              onClick={() => changePage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg border 
                ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white hover:bg-gray-100"
                }`}
            >
              Prev
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => changePage(num)}
                className={`px-4 py-2 rounded-lg border ${
                  currentPage === num
                    ? "bg-blue-600 text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                {num}
              </button>
            ))}

            {/* Next */}
            <button
              onClick={() => changePage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg border 
                ${
                  currentPage === totalPages
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white hover:bg-gray-100"
                }`}
            >
              Next
            </button>

          </div>
        )}

      </div>
    </AdminLayout>
  );
};

export default AllContactsList;
