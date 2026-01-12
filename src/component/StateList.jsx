// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import AdminLayout from "./layout/AdminLayout";

// import {
//   getStatesThunk,
//   deleteStateThunk,
//   toggleStateStatusThunk,
//   clearStateMessage,
// } from "../store/slices/stateSlice";

// /* ------------------------
//    Skeleton Loader Component
// ------------------------- */
// const StateSkeleton = () => {
//   return (
//     <>
//       {Array.from({ length: 6 }).map((_, i) => (
//         <tr key={i} className="animate-pulse">
//           <td className="p-4 border">
//             <div className="w-10 h-4 bg-gray-200 rounded"></div>
//           </td>
//           <td className="p-4 border">
//             <div className="w-32 h-4 bg-gray-200 rounded"></div>
//           </td>
//           <td className="p-4 border">
//             <div className="w-20 h-5 bg-gray-200 rounded-full"></div>
//           </td>
//           <td className="p-4 border text-center">
//             <div className="flex justify-center gap-4">
//               <div className="w-16 h-8 bg-gray-200 rounded"></div>
//               <div className="w-16 h-8 bg-gray-200 rounded"></div>
//             </div>
//           </td>
//         </tr>
//       ))}
//     </>
//   );
// };

// const StateList = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { states, loading, message } = useSelector((state) => state.states);

//   useEffect(() => {
//     dispatch(getStatesThunk());
//   }, [dispatch]);

//   // Auto clear success/error messages
//   useEffect(() => {
//     if (message) {
//       const timer = setTimeout(() => dispatch(clearStateMessage()), 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [message, dispatch]);

//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this state?")) {
//       dispatch(deleteStateThunk(id));
//     }
//   };

//   const handleToggle = (id) => {
//     dispatch(toggleStateStatusThunk(id));
//   };

//   return (
//     <AdminLayout>
//       <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-200">

//         {/* Header */}
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold text-gray-800">All States</h2>

//           <button
//             onClick={() => navigate("/admin/add-state")}
//             className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition cursor-pointer"
//           >
//             + Add State
//           </button>
//         </div>

//         {/* Success / Error Message */}
//         {message && (
//           <div
//             className={`mb-4 p-3 rounded-lg ${
//               message.type === "success"
//                 ? "bg-green-100 text-green-700"
//                 : "bg-red-100 text-red-700"
//             }`}
//           >
//             {message.text}
//           </div>
//         )}

//         {/* Table */}
//         <div className="overflow-x-auto rounded-xl border border-gray-200">
//           <table className="min-w-full text-left border">
//             <thead className="bg-gray-100 text-gray-700 font-semibold border">
//               <tr>
//                 <th className="p-3 border-r border">S.no</th>
//                 <th className="p-3 border-r border">State Name</th>
//                 <th className="p-3 border-r border">Status</th>
//                 <th className="p-3 text-center border">Actions</th>
//               </tr>
//             </thead>

//             <tbody className="divide-y">
//               {loading ? (
//                 <StateSkeleton />
//               ) : states?.length > 0 ? (
//                 states.map((st, index) => (
//                   <tr key={st._id} className="hover:bg-gray-50 transition">
//                     <td className="p-3 border-r border">{index + 1}</td>
//                     <td className="p-3 border-r  border capitalize">{st.name}</td>

//                     <td className="p-3 border-r border">
//                       <span
//                         className={`px-3 py-1 rounded-full text-sm font-medium ${
//                           st.status === "Active"
//                             ? "bg-green-100 text-green-700"
//                             : "bg-red-100 text-red-700"
//                         }`}
//                       >
//                         {st.status}
//                       </span>
//                     </td>

//                     <td className="p-3 text-center border" >
//                       <div className="flex justify-center gap-3">

//                         {/* Toggle Status */}
//                         <button
//                           onClick={() => handleToggle(st._id)}
//                           className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded-lg transition"
//                         >
//                           Toggle
//                         </button>

//                         {/* Delete */}
//                         <button
//                           onClick={() => handleDelete(st._id)}
//                           className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-lg transition"
//                         >
//                           Delete
//                         </button>

//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td className="p-5 text-center text-gray-500" colSpan="4">
//                     No states found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </AdminLayout>
//   );
// };

// export default StateList;


import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AdminLayout from "./layout/AdminLayout";

import {
  getStatesThunk,
  deleteStateThunk,
  toggleStateStatusThunk,
  clearStateMessage,
} from "../store/slices/stateSlice";

/* Skeleton Loader */
const StateSkeleton = () => {
  return (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        <tr key={i} className="animate-pulse">
          <td className="p-4 border">
            <div className="w-10 h-4 bg-gray-200 rounded"></div>
          </td>
          <td className="p-4 border">
            <div className="w-32 h-4 bg-gray-200 rounded"></div>
          </td>
          <td className="p-4 border">
            <div className="w-20 h-5 bg-gray-200 rounded-full"></div>
          </td>
          <td className="p-4 border text-center">
            <div className="flex justify-center gap-4">
              <div className="w-16 h-8 bg-gray-200 rounded"></div>
              <div className="w-16 h-8 bg-gray-200 rounded"></div>
            </div>
          </td>
        </tr>
      ))}
    </>
  );
};

const StateList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { states, loading, message } = useSelector((state) => state.states);

  /* -------------------------
     PAGINATION LOGIC
  -------------------------- */
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // change page size here

  const totalItems = states?.length || 0;
  const totalPages = Math.ceil(totalItems / pageSize);

  const paginatedStates = states?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const changePage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  useEffect(() => {
    dispatch(getStatesThunk());
  }, [dispatch]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => dispatch(clearStateMessage()), 3000);
      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this state?")) {
      dispatch(deleteStateThunk(id));
    }
  };

  const handleToggle = (id) => {
    dispatch(toggleStateStatusThunk(id));
  };

  return (
    <AdminLayout>
      <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-200">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">All States</h2>

          <button
            onClick={() => navigate("/admin/add-state")}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition cursor-pointer"
          >
            + Add State
          </button>
        </div>

        {/* Success / Error Message */}
        {message && (
          <div
            className={`mb-4 p-3 rounded-lg ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="min-w-full text-left border">
            <thead className="bg-gray-100 text-gray-700 font-semibold border">
              <tr>
                <th className="p-3 border-r border">S.no</th>
                <th className="p-3 border-r border">State Name</th>
                <th className="p-3 border-r border">Status</th>
                <th className="p-3 text-center border">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">

              {loading ? (
                <StateSkeleton />
              ) : paginatedStates?.length > 0 ? (
                paginatedStates.map((st, index) => (
                  <tr key={st._id} className="hover:bg-gray-50 transition">
                    <td className="p-3 border-r border">
                      {(currentPage - 1) * pageSize + (index + 1)}
                    </td>

                    <td className="p-3 border-r border capitalize">
                      {st.name}
                    </td>

                    <td className="p-3 border-r border">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          st.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {st.status}
                      </span>
                    </td>

                    <td className="p-3 text-center border">

                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => handleToggle(st._id)}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded-lg transition"
                        >
                          Toggle
                        </button>

                        <button
                          onClick={() => handleDelete(st._id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-lg transition"
                        >
                          Delete
                        </button>
                      </div>

                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="p-5 text-center text-gray-500" colSpan="4">
                    No states found.
                  </td>
                </tr>
              )}

            </tbody>
          </table>
        </div>

        {/* ----------------------------
              PAGINATION UI
        ----------------------------- */}
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

      </div>
    </AdminLayout>
  );
};

export default StateList;
