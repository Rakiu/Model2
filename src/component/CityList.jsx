import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AdminLayout from "./layout/AdminLayout";

import {
  getCitiesThunk,
  deleteCityThunk,
  updateCityStatusThunk,
} from "../store/slices/citySlice";

import Drawer from "@mui/material/Drawer";
import { toast } from "react-toastify";

import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

/* ------------------------
   Skeleton Loader Component
------------------------- */
const TableSkeleton = () => {
  return (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        <tr key={i} className="animate-pulse border-b">
          <td className="p-4 border">
            <div className="h-4 bg-gray-200 rounded w-10"></div>
          </td>
          <td className="p-4 border">
            <div className="h-4 bg-gray-200 rounded w-40 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-32"></div>
          </td>
          <td className="p-4 border">
            <div className="h-4 bg-gray-200 rounded w-28"></div>
          </td>
          <td className="p-4 border text-center">
            <div className="flex justify-center gap-4">
              <div className="h-8 w-8 bg-gray-200 rounded"></div>
              <div className="h-8 w-8 bg-gray-200 rounded"></div>
              <div className="h-8 w-8 bg-gray-200 rounded"></div>
            </div>
          </td>
        </tr>
      ))}
    </>
  );
};

const AllCities = () => {
  const dispatch = useDispatch();
  const { cities, loading } = useSelector((s) => s.city);

  const [open, setOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);

  /* ---------------------------
        PAGINATION STATES
  ---------------------------- */
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const totalItems = cities?.length || 0;
  const totalPages = Math.ceil(totalItems / pageSize);

  const paginatedCities = cities?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const changePage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  /* Fetch Cities */
  useEffect(() => {
    dispatch(getCitiesThunk());
  }, [dispatch]);

  const toggleDrawer = (value) => setOpen(value);

  // DELETE CITY
  const handleDelete = async (cityId) => {
    if (!window.confirm("Are you sure you want to delete this city?")) return;

    const action = await dispatch(deleteCityThunk(cityId));

    if (action.meta.requestStatus === "fulfilled") {
      toast.success("City deleted successfully");
      dispatch(getCitiesThunk());
    } else {
      toast.error("Failed to delete city");
    }
  };

  // STATUS UPDATE
  const updateStatusInDrawer = async (city) => {
    const newStatus = city.status === "Active" ? "Inactive" : "Active";

    const action = await dispatch(
      updateCityStatusThunk({ id: city._id, status: newStatus })
    );

    if (action.meta.requestStatus === "fulfilled") {
      toast.success("Status updated");
      dispatch(getCitiesThunk());
      toggleDrawer(false);
    } else {
      toast.error("Failed to update status");
    }
  };

  // OPEN DRAWER
  const handleView = (city) => {
    setSelectedCity(city);
    toggleDrawer(true);
  };

  return (
    <AdminLayout>
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">All Cities</h2>

          <Link
            to="/admin/create-city"
            className="px-5 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition cursor-pointer"
          >
            + Add New City
          </Link>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
          <table className="min-w-full text-left border">
            <thead className="bg-gray-100 border">
              <tr className="text-gray-700 border font-semibold">
                <th className="p-3 border-r">S.no</th>
                <th className="p-3 border-r">City Details</th>
                <th className="p-3 border-r">Created At</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y border">
              {loading ? (
                <TableSkeleton />
              ) : paginatedCities.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-gray-500">
                    No cities found
                  </td>
                </tr>
              ) : (
                paginatedCities.map((city, index) => (
                  <tr
                    key={city._id}
                    className="hover:bg-gray-50 transition border"
                  >
                    {/* S.no */}
                    <td className="p-3 text-gray-800 font-semibold border">
                      {(currentPage - 1) * pageSize + (index + 1)}
                    </td>

                    {/* CITY DETAILS */}
                    <td className="p-3 border">
                      <div className="text-sm text-gray-600">
                        City: {city.mainCity}
                      </div>

                      <div className="text-sm text-gray-600">
                        State:{" "}
                        {city.state?.name
                          ? city.state.name.charAt(0).toUpperCase() +
                            city.state.name.slice(1)
                          : "Not Assigned"}
                      </div>
                    </td>

                    {/* CREATED AT */}
                    <td className="p-3 text-gray-700 border">
                      {new Date(city.createdAt).toLocaleDateString()}
                    </td>

                    {/* ACTION ICONS */}
                    <td className="p-3">
                      <div className="flex justify-center gap-4">
                        {/* VIEW */}
                        <button
                          onClick={() => handleView(city)}
                          className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition shadow cursor-pointer"
                        >
                          <EyeIcon className="w-5 h-5 text-gray-700" />
                        </button>

                        {/* EDIT */}
                        <Link
                          to={`/admin/edit-city/${city._id}`}
                          className="p-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition shadow cursor-pointer"
                        >
                          <PencilSquareIcon className="w-5 h-5 text-white" />
                        </Link>

                        {/* DELETE */}
                        <button
                          onClick={() => handleDelete(city._id)}
                          className="p-2 bg-red-600 rounded-lg hover:bg-red-700 transition shadow cursor-pointer"
                        >
                          <TrashIcon className="w-5 h-5 text-white" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* -----------------------------------
              PAGINATION UI
        ------------------------------------- */}
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
                    ? "bg-blue-600 text-white"
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

        {/* RIGHT DRAWER */}
        <Drawer anchor="right" open={open} onClose={() => toggleDrawer(false)}>
          <div className="w-[430px] p-6 bg-white h-full overflow-y-auto shadow-xl">

            {selectedCity && (
              <>
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
                  {selectedCity.mainCity}
                </h2>

                <p className="text-center text-gray-500 mb-6">
                  City Information Overview
                </p>

                <hr className="my-4 border-gray-200" />

                {/* STATUS BUTTON */}
                <button
                  onClick={() => updateStatusInDrawer(selectedCity)}
                  className={`w-full py-3 rounded-xl text-white font-semibold text-lg mb-6 cursor-pointer transition ${
                    selectedCity.status === "Active"
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  {selectedCity.status}
                </button>

                <div className="space-y-5">

                  {/* State */}
                  <div>
                    <strong className="text-gray-800">State:</strong>
                    <p className="text-gray-600 mt-1">
                      {selectedCity.state?.name || "No State Assigned"}
                    </p>
                  </div>

                  {/* Local Areas */}
                  <div>
                    <strong className="text-gray-800">Local Areas:</strong>
                    <ul className="list-disc ml-6 text-gray-600 mt-1">
                      {selectedCity.localAreas?.map((area, index) => (
                        <li key={index}>
                          <span className="font-medium">{area.name}</span> –{" "}
                          {area.description}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Description */}
                  <div>
                    <strong className="text-gray-800">Description:</strong>
                    <div
                      className="prose mt-2 text-gray-600"
                      dangerouslySetInnerHTML={{
                        __html: selectedCity.description,
                      }}
                    />
                  </div>

                </div>
              </>
            )}

          </div>
        </Drawer>
      </div>
    </AdminLayout>
  );
};

export default AllCities;
