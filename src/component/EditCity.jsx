import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

import AdminLayout from "./layout/AdminLayout";
import { getCitiesThunk, updateCityThunk } from "../store/slices/citySlice";
import { getStatesThunk } from "../store/slices/stateSlice";
import RichTextEditor from "./RichTextEditor";

/* ---------------- SKELETON ---------------- */
const SkeletonBox = ({ height = "h-10" }) => (
  <div className={`bg-gray-200 rounded-lg animate-pulse ${height}`} />
);

const EditCity = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cityId } = useParams();

  const { cities } = useSelector((s) => s.city);
  const { states } = useSelector((s) => s.states);

  const [loading, setLoading] = useState(false);
  const [initialLoaded, setInitialLoaded] = useState(false);

  const [form, setForm] = useState({
    heading: "",
    subDescription: "",
    mainCity: "",
    state: "",
    whatsappNumber: "",
    phoneNumber: "",
    description: "",
  });

  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const [localAreas, setLocalAreas] = useState([
    { name: "", description: "" },
  ]);

  /* ---------------- LOAD DATA ---------------- */
  useEffect(() => {
    dispatch(getStatesThunk());
    dispatch(getCitiesThunk());
  }, [dispatch]);

  /* ---------------- LOAD CITY ---------------- */
  useEffect(() => {
    if (!cities.length) return;

    const city = cities.find((c) => c._id === cityId);
    if (!city) return;

    setForm({
      heading: city.heading || "",
      subDescription: city.subDescription || "",
      mainCity: city.mainCity || "",
      state: city.state?._id || "",
      whatsappNumber: city.whatsappNumber || "",
      phoneNumber: city.phoneNumber || "",
      description: city.description || "",
    });

    setPreviewImage(city.imageUrl || null);

    if (city.localAreas?.length) {
      setLocalAreas(
        city.localAreas.map((a) => ({
          name: a.name || "",
          description: a.description || "",
        }))
      );
    }

    setInitialLoaded(true);
  }, [cities, cityId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.state) return toast.error("Please select a State");

    setLoading(true);

    const fd = new FormData();
    fd.append("heading", form.heading.trim());
    fd.append("subDescription", form.subDescription.trim());
    fd.append("mainCity", form.mainCity.trim());
    fd.append("state", form.state);
    fd.append("whatsappNumber", form.whatsappNumber);
    fd.append("phoneNumber", form.phoneNumber);
    fd.append("description", form.description);
    fd.append("localAreas", JSON.stringify(localAreas));
    if (image) fd.append("image", image);

    const res = await dispatch(
      updateCityThunk({ cityId, formData: fd })
    );

    setLoading(false);

    if (res.meta.requestStatus === "fulfilled") {
      toast.success("City updated successfully!");
      navigate("/admin/all-cities");
    } else {
      toast.error("Failed to update city");
    }
  };

  /* ---------------- LOCAL AREAS ---------------- */
  const updateLocalArea = (i, key, value) => {
    const arr = [...localAreas];
    arr[i][key] = value;
    setLocalAreas(arr);
  };

  const addLocalArea = () =>
    setLocalAreas([...localAreas, { name: "", description: "" }]);

  const removeLocalArea = (i) =>
    setLocalAreas(localAreas.filter((_, idx) => idx !== i));

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border">

          {/* HEADER */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Edit City
            </h2>
            <button
              onClick={() => navigate("/admin/all-cities")}
              className="px-5 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 border"
            >
              ← Back
            </button>
          </div>

          {!initialLoaded ? (
            <div className="space-y-6">
              <SkeletonBox height="h-12" />
              <SkeletonBox height="h-12" />
              <SkeletonBox height="h-40" />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-12">

              {/* BASIC INFO */}
              <Section title="Basic Information">

                <Input
                  label="City Heading"
                  name="heading"
                  value={form.heading}
                  onChange={handleChange}
                />

                <Textarea
                  label="Sub Description"
                  rows={3}
                  name="subDescription"
                  value={form.subDescription}
                  onChange={handleChange}
                />

                <Grid>
                  <Input
                    label="Main City Title Name"
                    name="mainCity"
                    value={form.mainCity}
                    onChange={handleChange}
                  />

                  <Select
                    label="Select State *"
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                  >
                    <option value="">-- Select State --</option>
                    {states?.map((s) => (
                      <option key={s._id} value={s._id}>
                        {s.name.charAt(0).toUpperCase() + s.name.slice(1)}
                      </option>
                    ))}
                  </Select>
                </Grid>

                <Grid>
                  <Input
                    label="WhatsApp Number"
                    name="whatsappNumber"
                    value={form.whatsappNumber}
                    onChange={handleChange}
                  />

                  <Input
                    label="Phone Number"
                    name="phoneNumber"
                    value={form.phoneNumber}
                    onChange={handleChange}
                  />
                </Grid>

                <FileInput
                  label="City Image"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                    setPreviewImage(URL.createObjectURL(e.target.files[0]));
                  }}
                />

                {previewImage && (
                  <img
                    src={previewImage}
                    alt="preview"
                    className="w-48 h-32 object-cover rounded-lg shadow"
                  />
                )}
              </Section>

              {/* LOCAL AREAS */}
              <Section title="Local Areas">
                {localAreas.map((area, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl border mb-4"
                  >
                    <Input
                      label="Local Area Name"
                      value={area.name}
                      onChange={(e) =>
                        updateLocalArea(i, "name", e.target.value)
                      }
                    />
                    <Input
                      label="Local Area Description"
                      value={area.description}
                      onChange={(e) =>
                        updateLocalArea(i, "description", e.target.value)
                      }
                    />
                    {i > 0 && (
                      <button
                        type="button"
                        onClick={() => removeLocalArea(i)}
                        className="text-red-600 text-sm"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addLocalArea}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                >
                  + Add Local Area
                </button>
              </Section>

              {/* DESCRIPTION */}
              <Section title="Description">
                <div className="border rounded-xl p-2">
                  <RichTextEditor
                    value={form.description}
                    onChange={(val) =>
                      setForm((p) => ({ ...p, description: val }))
                    }
                  />
                </div>
              </Section>

              {/* SUBMIT */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-xl text-lg shadow-lg flex items-center gap-3 disabled:opacity-50"
                >
                  {loading && (
                    <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                  )}
                  {loading ? "Updating..." : "Update City"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default EditCity;

/* ---------------- UI HELPERS ---------------- */

const Section = ({ title, children }) => (
  <div className="space-y-6">
    <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
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
    <label className="font-semibold text-gray-700">{label}</label>
    <input
      {...props}
      className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
    />
  </div>
);

const Textarea = ({ label, ...props }) => (
  <div className="flex flex-col gap-2">
    <label className="font-semibold text-gray-700">{label}</label>
    <textarea
      {...props}
      className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none resize-none"
    />
  </div>
);

const Select = ({ label, children, ...props }) => (
  <div className="flex flex-col gap-2">
    <label className="font-semibold text-gray-700">{label}</label>
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
    <label className="font-semibold text-gray-700">{label}</label>
    <input
      type="file"
      {...props}
      className="w-full border px-4 py-3 rounded-lg bg-gray-50"
    />
  </div>
);
