import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axiosInstance";

import {
  ADD_CITY_URL,
  GET_CITIES_URL,
  DELETE_CITY_URL,
  UPDATE_CITY_URL,
  CITY_STATUS_URL,
  GET_CITY_BY_ID_URL,
} from "../../api/constant/constant";

/* =======================================================
   🟣 GET SINGLE CITY BY ID
======================================================= */
export const getCityByIdThunk = createAsyncThunk(
  "city/getById",
  async (cityId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`${GET_CITY_BY_ID_URL}/${cityId}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch city");
    }
  }
);

/* =======================================================
   🟢 ADD CITY
======================================================= */
export const addCityThunk = createAsyncThunk(
  "city/add",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(ADD_CITY_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.data;
    } catch (error) {
      let message =
        error.response?.data?.message ||
        error.message ||
        "Failed to add city";

      if (
        error.response?.data?.message?.includes("E11000") ||
        error.response?.data?.message?.toLowerCase().includes("duplicate")
      ) {
        message = "City name already exists!";
      }

      return rejectWithValue(message);
    }
  }
);

/* =======================================================
   🔵 GET ALL CITIES
======================================================= */
export const getCitiesThunk = createAsyncThunk(
  "city/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(GET_CITIES_URL);
      return Array.isArray(res.data) ? res.data : [];
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch cities");
    }
  }
);

/* =======================================================
   🔴 DELETE CITY
======================================================= */
export const deleteCityThunk = createAsyncThunk(
  "city/delete",
  async (cityId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`${DELETE_CITY_URL}/${cityId}`);
      return cityId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete city");
    }
  }
);

/* =======================================================
   🟡 UPDATE CITY
======================================================= */
export const updateCityThunk = createAsyncThunk(
  "city/update",
  async ({ cityId, formData }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(
        `${UPDATE_CITY_URL}/${cityId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update city");
    }
  }
);

/* =======================================================
   🟣 UPDATE CITY STATUS
======================================================= */
export const updateCityStatusThunk = createAsyncThunk(
  "city/updateStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.patch(`${CITY_STATUS_URL}/${id}`, {
        status,
      });
      return res.data.city;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update status");
    }
  }
);

/* =======================================================
   🎯 CITY SLICE
======================================================= */
const citySlice = createSlice({
  name: "city",

  initialState: {
    cities: [],
    singleCity: null,
    loading: false,
    error: null,
    success: null,
    deleteLoading: false,
    statusLoading: false,
  },

  reducers: {
    resetCityState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = null;
      state.singleCity = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /* ADD CITY */
      .addCase(addCityThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCityThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.cities.push(action.payload);
        state.success = true;
      })
      .addCase(addCityThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* GET ALL CITIES */
      .addCase(getCitiesThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCitiesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.cities = action.payload;
      })
      .addCase(getCitiesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* GET SINGLE CITY */
      .addCase(getCityByIdThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCityByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.singleCity = action.payload;
      })
      .addCase(getCityByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* DELETE CITY */
      .addCase(deleteCityThunk.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deleteCityThunk.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.cities = state.cities.filter((c) => c._id !== action.payload);
      })
      .addCase(deleteCityThunk.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload;
      })

      /* UPDATE CITY */
      .addCase(updateCityThunk.fulfilled, (state, action) => {
        state.cities = state.cities.map((city) =>
          city._id === action.payload._id ? action.payload : city
        );
      })
      .addCase(updateCityThunk.rejected, (state, action) => {
        state.error = action.payload;
      })

      /* UPDATE CITY STATUS */
      .addCase(updateCityStatusThunk.pending, (state) => {
        state.statusLoading = true;
      })
      .addCase(updateCityStatusThunk.fulfilled, (state, action) => {
        state.statusLoading = false;
        state.cities = state.cities.map((city) =>
          city._id === action.payload._id ? action.payload : city
        );
      })
      .addCase(updateCityStatusThunk.rejected, (state, action) => {
        state.statusLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetCityState } = citySlice.actions;
export default citySlice.reducer;
