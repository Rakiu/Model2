import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AdminLayout from "./layout/AdminLayout";
import { addCityThunk, resetCityState } from "../store/slices/citySlice";
import { getStatesThunk } from "../store/slices/stateSlice";
import RichTextEditor from "./RichTextEditor";

const AddCity = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, success } = useSelector((s) => s.city);
  const { states } = useSelector((s) => s.states);

  const [form, setForm] = useState({
    mainCity: "",
    heading: "",
    subDescription: "",
    state: "",
    whatsappNumber: "",
    phoneNumber: "",
    description: "",
  });

  const [image, setImage] = useState(null);
  const [localAreas, setLocalAreas] = useState([
    { name: "", description: "" },
  ]);

  useEffect(() => {
    dispatch(getStatesThunk());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.state) return toast.error("Please select a State");

    const fd = new FormData();
    fd.append("heading", form.heading.trim());
    fd.append("subDescription", form.subDescription.trim());
    fd.append("mainCity", form.mainCity.trim());
    fd.append("state", form.state);
    fd.append("whatsappNumber", form.whatsappNumber.trim());
    fd.append("phoneNumber", form.phoneNumber.trim());
    fd.append("description", form.description);
    fd.append("localAreas", JSON.stringify(localAreas));
    if (image) fd.append("image", image);

    dispatch(addCityThunk(fd));
  };

  useEffect(() => {
    if (success) {
      toast.success("City added successfully!");
      dispatch(resetCityState());
      navigate("/admin/all-cities");
    }
  }, [success, dispatch, navigate]);

  const updateLocalArea = (i, key, val) => {
    const clone = [...localAreas];
    clone[i][key] = val;
    setLocalAreas(clone);
  };

  const addLocalArea = () =>
    setLocalAreas([...localAreas, { name: "", description: "" }]);

  const removeLocalArea = (i) => {
    const clone = [...localAreas];
    clone.splice(i, 1);
    setLocalAreas(clone);
  };

  return (
    <AdminLayout>
      {/* LOADING OVERLAY */}
      {loading && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="animate-spin h-14 w-14 border-4 border-white border-t-transparent rounded-full" />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl border p-6 sm:p-8">
          {/* HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Add New City
            </h2>

            <button
              onClick={() => navigate("/admin/all-cities")}
              className="self-start sm:self-auto px-5 py-2 rounded-lg border bg-gray-100 hover:bg-gray-200 font-medium"
            >
              ← Back
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-12">

            {/* ===== BASIC INFO CARD ===== */}
            <Section title="Basic Information">
              <Input
                label="City Heading"
                placeholder="e.g. Best Escort Services in Jaipur"
                value={form.heading}
                onChange={(e) =>
                  setForm((p) => ({ ...p, heading: e.target.value }))
                }
              />

              <Textarea
                label="Sub Description"
                rows={3}
                placeholder="Short city description shown below heading"
                value={form.subDescription}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    subDescription: e.target.value,
                  }))
                }
              />

              <Grid>
                <Input
                  label="Main City Title Name"
                  placeholder="Enter main city (e.g. Jaipur)"
                  value={form.mainCity}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      mainCity: e.target.value,
                    }))
                  }
                />

                <Select
                  label="Select State *"
                  value={form.state}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      state: e.target.value,
                    }))
                  }
                >
                  <option value="">-- Select State --</option>
                  {states?.map((st) => (
                    <option key={st._id} value={st._id}>
                      {st.name.charAt(0).toUpperCase() +
                        st.name.slice(1)}
                    </option>
                  ))}
                </Select>
              </Grid>

              <Grid>
                <Input
                  label="WhatsApp Number"
                  placeholder="Enter WhatsApp number"
                  value={form.whatsappNumber}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      whatsappNumber: e.target.value,
                    }))
                  }
                />

                <Input
                  label="Phone Number"
                  placeholder="Enter phone number"
                  value={form.phoneNumber}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      phoneNumber: e.target.value,
                    }))
                  }
                />
              </Grid>

              <FileInput
                label="City Image *"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Section>

            {/* ===== LOCAL AREAS ===== */}
            <Section title="Local Areas">
              <div className="space-y-4">
                {localAreas.map((area, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl border"
                  >
                    <Input
                      label="Local Area Name"
                      placeholder="Area name"
                      value={area.name}
                      onChange={(e) =>
                        updateLocalArea(
                          i,
                          "name",
                          e.target.value
                        )
                      }
                    />

                    <Input
                      label="Local Area Description"
                      placeholder="Short description"
                      value={area.description}
                      onChange={(e) =>
                        updateLocalArea(
                          i,
                          "description",
                          e.target.value
                        )
                      }
                    />

                    {i > 0 && (
                      <button
                        type="button"
                        onClick={() => removeLocalArea(i)}
                        className="text-red-600 font-medium text-sm"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addLocalArea}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg w-fit"
                >
                  + Add Local Area
                </button>
              </div>
            </Section>

            {/* ===== DESCRIPTION ===== */}
            <Section title="Description">
              <div className="border rounded-xl p-2">
                <RichTextEditor
                  value={form.description}
                  onChange={(val) =>
                    setForm((p) => ({
                      ...p,
                      description: val,
                    }))
                  }
                />
              </div>
            </Section>

            {/* ===== SUBMIT ===== */}
            <div className="flex justify-end">
              <button
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-xl text-lg shadow-lg disabled:opacity-50 w-full sm:w-auto"
              >
                {loading ? "Adding..." : "Add City"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddCity;

/* ================== UI HELPERS ================== */

const Section = ({ title, children }) => (
  <div className="space-y-6">
    <h3 className="text-lg font-semibold text-gray-800">
      {title}
    </h3>
    {children}
  </div>
);

const Grid = ({ children }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {children}
  </div>
);

const Input = ({ label, ...props }) => (
  <div className="flex flex-col gap-2">
    <label className="font-semibold text-gray-700">
      {label}
    </label>
    <input
      {...props}
      className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
    />
  </div>
);

const Textarea = ({ label, ...props }) => (
  <div className="flex flex-col gap-2">
    <label className="font-semibold text-gray-700">
      {label}
    </label>
    <textarea
      {...props}
      className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none resize-none"
    />
  </div>
);

const Select = ({ label, children, ...props }) => (
  <div className="flex flex-col gap-2">
    <label className="font-semibold text-gray-700">
      {label}
    </label>
    <select
      {...props}
      className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none cursor-pointer"
    >
      {children}
    </select>
  </div>
);

const FileInput = ({ label, ...props }) => (
  <div className="flex flex-col gap-2">
    <label className="font-semibold text-gray-700">
      {label}
    </label>
    <input
      type="file"
      {...props}
      className="w-full border px-4 py-3 rounded-lg bg-gray-50"
    />
  </div>
);
