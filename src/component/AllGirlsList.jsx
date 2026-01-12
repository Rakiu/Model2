import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import AdminLayout from "./layout/AdminLayout";
import {
  getAllGirlsThunk,
  toggleGirlStatusThunk,
  deleteGirlThunk,
} from "../store/slices/girlSlice";

/* ------------------------
   Skeleton Loader Component
------------------------- */
const GirlsSkeleton = () => {
  return (
    <>
      {Array.from({ length: 8 }).map((_, i) => (
        <tr key={i} className="animate-pulse border-b">
          <td className="p-4 border">
            <div className="w-14 h-14 bg-gray-200 rounded-lg"></div>
          </td>
          <td className="p-4 border">
            <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
          </td>
          <td className="p-4 border">
            <div className="h-4 bg-gray-200 rounded w-10"></div>
          </td>
          <td className="p-4 border">
            <div className="h-4 bg-gray-200 rounded w-32"></div>
          </td>
          <td className="p-4 border">
            <div className="h-4 bg-gray-200 rounded w-40"></div>
          </td>
          <td className="p-4 border">
            <div className="h-4 bg-gray-200 rounded w-20"></div>
          </td>
          <td className="p-4 border">
            <div className="h-6 bg-gray-200 rounded-full w-20"></div>
          </td>
          <td className="p-4 border text-center">
            <div className="flex justify-center gap-3">
              <div className="h-8 w-14 bg-gray-200 rounded"></div>
              <div className="h-8 w-14 bg-gray-200 rounded"></div>
            </div>
          </td>
        </tr>
      ))}
    </>
  );
};

const AllGirlsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, girls, error } = useSelector((state) => state.girls);
  const [statusLoadingId, setStatusLoadingId] = useState(null);

  /* ---------------------------
      CUSTOM PAGINATION STATES
  ---------------------------- */
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // rows per page

  const totalItems = girls?.length || 0;
  const totalPages = Math.ceil(totalItems / pageSize);

  const paginatedGirls = girls?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const changePage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  /* Fetch all girls */
  useEffect(() => {
    dispatch(getAllGirlsThunk());
  }, [dispatch]);

  // DELETE
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this girl?")) {
      dispatch(deleteGirlThunk({ id }));
    }
  };

  // STATUS TOGGLE
  const handleStatusChange = async (girl) => {
    setStatusLoadingId(girl._id);

    await dispatch(
      toggleGirlStatusThunk({
        id: girl._id,
        status: girl.status === "Active" ? "Inactive" : "Active",
      })
    );

    setStatusLoadingId(null);
  };

  // RENDER MULTIPLE CITIES
  const renderCities = (cityArray) => {
    if (!Array.isArray(cityArray)) return "—";
    return cityArray.map((c) => c.mainCity).join(", ");
  };

  return (
    <AdminLayout>
      <div className="bg-white shadow-xl rounded-xl p-6 w-full">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-800">Girls Management</h2>

          <Link
            to="/admin/add-girl"
            className="bg-pink-600 hover:bg-pink-700 text-white px-5 py-2 rounded-lg shadow-md transition cursor-pointer"
          >
            + Add Girl
          </Link>
        </div>

        {/* Error */}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* TABLE */}
        <div className="overflow-x-auto rounded-xl border border-gray-300 shadow-sm">
          <table className="w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-left border-b border-gray-300">
                <th className="p-3 border-r border-gray-300">Image</th>
                <th className="p-3 border-r border-gray-300">Name</th>
                <th className="p-3 border-r border-gray-300">Age</th>
                <th className="p-3 border-r border-gray-300">Cities</th>
                <th className="p-3 border-r border-gray-300">Heading</th>
                <th className="p-3 border-r border-gray-300">Price</th>
                <th className="p-3 border-r border-gray-300">Status</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <GirlsSkeleton />
              ) : paginatedGirls?.length > 0 ? (
                paginatedGirls.map((girl, index) => (
                  <tr
                    key={girl._id}
                    className="hover:bg-gray-50 transition border-b border-gray-300"
                  >
                    {/* IMAGE */}
                    <td className="p-3 border-r border-gray-300">
                      <img
                        src={
                          girl.imageUrl && girl.imageUrl.trim() !== ""
                            ? girl.imageUrl
                            : "https://placehold.co/150x150?text=No+Image"
                        }
                        alt={girl.name}
                        className="w-14 h-14 rounded-lg object-cover border shadow-sm"
                      />
                    </td>

                    {/* NAME */}
                    <td className="p-3 border-r border-gray-300 font-medium capitalize">
                      {girl.name}
                    </td>

                    {/* AGE */}
                    <td className="p-3 border-r border-gray-300">
                      {girl.age}
                    </td>

                    {/* CITIES */}
                    <td className="p-3 border-r border-gray-300 text-gray-700 font-medium capitalize">
                      {renderCities(girl.city)}
                    </td>

                    {/* HEADING */}
                    <td className="p-3 border-r border-gray-300">
                      {girl.heading?.length > 20
                        ? girl.heading.substring(0, 20) + "..."
                        : girl.heading}
                    </td>

                    {/* PRICE */}
                    <td className="p-3 border-r border-gray-300">
                      {girl.priceDetails}
                    </td>

                    {/* STATUS */}
                    <td className="p-3 border-r border-gray-300 text-center">
                      {statusLoadingId === girl._id ? (
                        <div className="w-6 h-6 border-2 border-pink-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                      ) : (
                        <span
                          onClick={() => handleStatusChange(girl)}
                          className={`px-3 py-1 rounded-lg text-sm font-medium cursor-pointer transition 
                            ${
                              girl.status === "Active"
                                ? "bg-green-100 text-green-700 hover:bg-green-200"
                                : "bg-red-100 text-red-700 hover:bg-red-200"
                            }`}
                        >
                          {girl.status}
                        </span>
                      )}
                    </td>

                    {/* ACTIONS */}
                    <td className="p-3 text-center">
                      <div className="flex justify-center gap-2">

                        <button
                          onClick={() => navigate(`/admin/edit-girl/${girl._id}`)}
                          className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 text-sm shadow transition"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(girl._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 text-sm shadow transition"
                        >
                          Delete
                        </button>

                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="p-6 text-center text-gray-500">
                    No Girls Found
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>

        {/* -----------------------------------
            PAGINATION
        ------------------------------------ */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-6">

            {/* Prev Button */}
            <button
              onClick={() => changePage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg border ${
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
                    ? "bg-pink-600 text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                {num}
              </button>
            ))}

            {/* Next Button */}
            <button
              onClick={() => changePage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg border ${
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

export default AllGirlsList;
