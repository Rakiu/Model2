import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import AdminLayout from "./layout/AdminLayout";
import { addGirlThunk } from "../store/slices/girlSlice";
import { getCitiesThunk } from "../store/slices/citySlice";

import { FormControl, InputLabel, Select, MenuItem, OutlinedInput, Chip } from "@mui/material";

const AddGirlForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cities } = useSelector((state) => state.city);
  const { loading } = useSelector((state) => state.girls);

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
    dispatch(getCitiesThunk());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCityChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      city: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const img = e.target.files[0];
    setImageFile(img);
    if (img) setPreviewImage(URL.createObjectURL(img));
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

    dispatch(addGirlThunk(fd)).then((res) => {
      if (!res.error) {
        navigate("/admin/model-girl");
      }
    });
  };

  return (
    <AdminLayout>
      <div className="relative bg-white p-8 shadow-xl rounded-2xl mt-6">
        {/* BACK */}
        <button
          onClick={() => navigate(-1)}
          className="mb-5 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700 shadow-sm cursor-pointer"
        >
          ← Back
        </button>

        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Add New Girl</h2>

        {/* Loading Overlay */}
        {loading && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-10 rounded-xl">
            <div className="w-12 h-12 border-4 border-pink-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Name" name="name" value={formData.name} onChange={handleChange} />

            <Input
              label="Age"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
            />

            <Input label="Heading" name="heading" value={formData.heading} onChange={handleChange} />

            {/* MUI MULTI SELECT WITH CHIPS */}
            <div>
              <label className="block text-gray-700 mb-1">Select Cities</label>

              <FormControl fullWidth size="small">
                <InputLabel id="city-select">Cities</InputLabel>

                <Select
                  labelId="city-select"
                  multiple
                  value={formData.city}
                  onChange={handleCityChange}
                  input={<OutlinedInput label="Cities" />}
                  renderValue={(selected) => (
                    <div className="flex flex-wrap gap-1">
                      {selected.map((id) => {
                        const c = cities.find((ct) => ct._id === id);
                        return <Chip key={id} label={c?.mainCity || "Unknown"} />;
                      })}
                    </div>
                  )}
                >
                  {cities.map((city) => (
                    <MenuItem key={city._id} value={city._id}>
                      {city.mainCity}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>

          <Textarea label="Description" name="description" value={formData.description} onChange={handleChange} />

          <Textarea label="Price Details" name="priceDetails" value={formData.priceDetails} onChange={handleChange} />

          {/* IMAGE */}
          <div>
            <label className="block text-gray-700 mb-1">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border rounded-lg"
            />

            {previewImage && (
              <img
                src={previewImage}
                className="w-32 h-32 object-cover rounded-lg mt-4 border shadow-md"
                alt="Preview"
              />
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-pink-600 hover:bg-pink-700 text-white py-3 px-8 rounded-lg shadow text-lg"
          >
            {loading ? "Uploading..." : "Add Girl"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

/* Reusable components */
const Input = ({ label, ...props }) => (
  <div>
    <label className="block text-gray-700 mb-1">{label}</label>
    <input {...props} required className="w-full px-4 py-2 border rounded-lg" />
  </div>
);

const Textarea = ({ label, ...props }) => (
  <div>
    <label className="block text-gray-700 mb-1">{label}</label>
    <textarea {...props} rows="4"  className="w-full px-4 py-2 border rounded-lg" />
  </div>
);

export default AddGirlForm;
