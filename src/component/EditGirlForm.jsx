import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import AdminLayout from "./layout/AdminLayout";
import { updateGirlThunk, getAllGirlsThunk } from "../store/slices/girlSlice";
import { getCitiesThunk } from "../store/slices/citySlice";

const EditGirlForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { girls, loading } = useSelector((state) => state.girls);
  const { cities } = useSelector((state) => state.city);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    heading: "",
    city: [],
    description: "",
    priceDetails: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    dispatch(getAllGirlsThunk());
    dispatch(getCitiesThunk());
  }, []);

  useEffect(() => {
    const girl = girls.find((g) => g._id === id);

    if (girl) {
      setFormData({
        name: girl.name,
        age: girl.age,
        heading: girl.heading,
        city: Array.isArray(girl.city) ? girl.city.map((c) => c._id) : [],
        description: girl.description,
        priceDetails: girl.priceDetails,
      });

      setPreviewImage(girl.imageUrl);
    }
  }, [girls, id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /* ----------------------------------------------
     MULTI-SELECT DROPDOWN (Material UI style)
  ---------------------------------------------- */
  const toggleCitySelection = (cityId) => {
    setFormData((prev) => {
      const alreadySelected = prev.city.includes(cityId);

      return {
        ...prev,
        city: alreadySelected
          ? prev.city.filter((id) => id !== cityId)
          : [...prev.city, cityId],
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("name", formData.name);
    fd.append("age", formData.age);
    fd.append("heading", formData.heading);
    fd.append("city", JSON.stringify(formData.city));
    fd.append("description", formData.description);
    fd.append("priceDetails", formData.priceDetails);

    if (imageFile) fd.append("image", imageFile);

    dispatch(updateGirlThunk({ id, formData: fd })).then((res) => {
      if (!res.error) navigate("/admin/model-girl");
    });
  };

  return (
    <AdminLayout>
      <div className="relative bg-white shadow-xl rounded-xl p-8 mt-6">

        <button
          onClick={() => navigate(-1)}
          className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700 shadow-sm flex items-center gap-2 cursor-pointer"
        >
          ← Back
        </button>

        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Edit Girl Details
        </h2>

        {loading && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10 rounded-xl">
            <div className="w-12 h-12 border-4 border-pink-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* FORM GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <Input label="Name" name="name" value={formData.name} onChange={handleChange} />

            <Input label="Age" name="age" type="number" value={formData.age} onChange={handleChange} />

            <Input label="Heading" name="heading" value={formData.heading} onChange={handleChange} />

            {/* MUI-LIKE MULTI SELECT */}
            <div className="relative">
              <label className="block text-gray-700 mb-2 font-medium">Select Cities</label>

              <div className="border rounded-lg p-2 bg-white">
                {/* Selected Chips */}
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.city.length === 0 && (
                    <span className="text-gray-400 text-sm">No cities selected</span>
                  )}

                  {formData.city.map((cityId) => {
                    const cityObj = cities.find((c) => c._id === cityId);
                    if (!cityObj) return null;

                    return (
                      <span
                        key={cityId}
                        className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm flex items-center gap-2"
                      >
                        {cityObj.mainCity}
                        <button
                          type="button"
                          onClick={() => toggleCitySelection(cityId)}
                          className="text-pink-700 hover:text-pink-900"
                        >
                          ×
                        </button>
                      </span>
                    );
                  })}
                </div>

                {/* Dropdown */}
                <div className="max-h-48 overflow-y-auto border-t pt-2">
                  {cities.map((city) => (
                    <label
                      key={city._id}
                      className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100 rounded"
                    >
                      <input
                        type="checkbox"
                        checked={formData.city.includes(city._id)}
                        onChange={() => toggleCitySelection(city._id)}
                        className="w-4 h-4"
                      />
                      <span>{city.mainCity}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* DESCRIPTION */}
          <Textarea
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />

          <Textarea
            label="Price Details"
            name="priceDetails"
            value={formData.priceDetails}
            onChange={handleChange}
          />

          {/* IMAGE UPLOAD */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Upload Image (Optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                setImageFile(file);
                if (file) setPreviewImage(URL.createObjectURL(file));
              }}
              className="w-full px-4 py-2 border rounded-lg bg-gray-50 cursor-pointer"
            />

            {previewImage && (
              <img
                src={previewImage}
                className="w-32 h-32 object-cover rounded-lg mt-4 shadow-md border"
                alt="preview"
              />
            )}
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="bg-pink-600 hover:bg-pink-700 text-white py-3 px-10 rounded-lg shadow text-lg cursor-pointer disabled:opacity-50 mb-12"
          >
            {loading ? "Updating..." : "Update Girl"}
          </button>

        </form>
      </div>
    </AdminLayout>
  );
};

/* ---------------------------------------
   Reusable Components
--------------------------------------- */
const Input = ({ label, ...props }) => (
  <div>
    <label className="block text-gray-700 font-medium mb-1">{label}</label>
    <input {...props} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400 outline-none" />
  </div>
);

const Textarea = ({ label, ...props }) => (
  <div>
    <label className="block text-gray-700 font-medium mb-1">{label}</label>
    <textarea {...props} required rows="4" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400 outline-none" />
  </div>
);

export default EditGirlForm;
