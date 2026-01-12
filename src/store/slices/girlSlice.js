import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axiosInstance";

import {
    ADD_GIRL_URL,
    GET_ALL_GIRLS_URL,
    GET_GIRLS_BY_CITY_URL,
    GET_SINGLE_GIRL_URL,   // ⭐ ADD THIS IN CONSTANT FILE
    DELETE_GIRL_URL,
    TOGGLE_GIRL_STATUS_URL,
    UPDATE_GIRL_URL,
} from "../../api/constant/constant";


// =======================================================
// 🔵 GET ALL GIRLS
// =======================================================
export const getAllGirlsThunk = createAsyncThunk(
    "girls/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get(GET_ALL_GIRLS_URL);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to load girls");
        }
    }
);


// =======================================================
// 🔵 GET GIRLS BY CITY
// =======================================================
export const getGirlsByCityThunk = createAsyncThunk(
    "girls/getByCity",
    async (cityId, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get(`${GET_GIRLS_BY_CITY_URL}/${cityId}`);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to load city girls");
        }
    }
);


// =======================================================
// ⭐ GET SINGLE GIRL (DETAIL PAGE)
// =======================================================
export const getGirlByIdThunk = createAsyncThunk(
    "girls/getOne",
    async (id, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get(`${GET_SINGLE_GIRL_URL}/${id}`);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to load girl details");
        }
    }
);


// =======================================================
// 🟢 ADD GIRL
// =======================================================
export const addGirlThunk = createAsyncThunk(
    "girls/add",
    async (formData, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.post(ADD_GIRL_URL, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            return res.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to add girl");
        }
    }
);


// =======================================================
// 🔴 DELETE GIRL
// =======================================================
export const deleteGirlThunk = createAsyncThunk(
    "girls/delete",
    async ({ id }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("adminToken");

            await axiosInstance.delete(`${DELETE_GIRL_URL}/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            return id;
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to delete girl");
        }
    }
);


// =======================================================
// 🟡 UPDATE GIRL
// =======================================================
export const updateGirlThunk = createAsyncThunk(
    "girls/update",
    async ({ id, formData }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("adminToken");

            const res = await axiosInstance.put(
                `${UPDATE_GIRL_URL}/${id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return res.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to update girl");
        }
    }
);


// =======================================================
// 🟣 TOGGLE STATUS
// =======================================================
export const toggleGirlStatusThunk = createAsyncThunk(
    "girls/toggleStatus",
    async ({ id, status }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("adminToken");

            const res = await axiosInstance.patch(
                `${TOGGLE_GIRL_STATUS_URL}/${id}`,
                { status },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            return { id, status: res.data.status };
        } catch (err) {
            return rejectWithValue(err.response?.data || "Status update failed");
        }
    }
);


// =======================================================
// 🎯 GIRL SLICE
// =======================================================

const girlSlice = createSlice({
    name: "girls",

    initialState: {
        girls: [],
        cityGirls: [],
        singleGirl: null,      // ⭐ for details page

        loading: false,
        error: null,
        success: null,

        deleteLoading: false,
        statusLoading: false,
    },

    reducers: {
        resetGirlState: (state) => {
            state.loading = false;
            state.error = null;
            state.success = null;
        },
    },

    extraReducers: (builder) => {

        // ============================
        // GET ALL GIRLS
        // ============================
        builder
            .addCase(getAllGirlsThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllGirlsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.girls = action.payload;
            })
            .addCase(getAllGirlsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });


        // ============================
        // GET GIRLS BY CITY
        // ============================
        builder
            .addCase(getGirlsByCityThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getGirlsByCityThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.cityGirls = action.payload;
            })
            .addCase(getGirlsByCityThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });


        // ============================
        // ⭐ GET SINGLE GIRL
        // ============================
        builder
            .addCase(getGirlByIdThunk.pending, (state) => {
                state.loading = true;
                state.singleGirl = null;
            })
            .addCase(getGirlByIdThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.singleGirl = action.payload;
            })
            .addCase(getGirlByIdThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });


        // ============================
        // ADD GIRL
        // ============================
        builder
            .addCase(addGirlThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(addGirlThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.success = "Girl added successfully";
                state.girls.unshift(action.payload);
            })
            .addCase(addGirlThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });


        // ============================
        // DELETE GIRL
        // ============================
        builder
            .addCase(deleteGirlThunk.pending, (state) => {
                state.deleteLoading = true;
            })
            .addCase(deleteGirlThunk.fulfilled, (state, action) => {
                state.deleteLoading = false;
                state.girls = state.girls.filter((g) => g._id !== action.payload);
            })
            .addCase(deleteGirlThunk.rejected, (state, action) => {
                state.deleteLoading = false;
                state.error = action.payload;
            });


        // ============================
        // UPDATE GIRL
        // ============================
        builder
            .addCase(updateGirlThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateGirlThunk.fulfilled, (state, action) => {
                state.loading = false;

                const updatedGirl = action.payload;
                const index = state.girls.findIndex((g) => g._id === updatedGirl._id);

                if (index !== -1) {
                    state.girls[index] = updatedGirl;
                }

                if (state.singleGirl && state.singleGirl._id === updatedGirl._id) {
                    state.singleGirl = updatedGirl;
                }
            })
            .addCase(updateGirlThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });


        // ============================
        // TOGGLE STATUS
        // ============================
        builder
            .addCase(toggleGirlStatusThunk.pending, (state) => {
                state.statusLoading = true;
            })
            .addCase(toggleGirlStatusThunk.fulfilled, (state, action) => {
                const { id, status } = action.payload;
                const girl = state.girls.find((g) => g._id === id);
                if (girl) girl.status = status;
                state.statusLoading = false;
            })
            .addCase(toggleGirlStatusThunk.rejected, (state, action) => {
                state.statusLoading = false;
                state.error = action.payload;
            });
    },
});


export const { resetGirlState } = girlSlice.actions;
export default girlSlice.reducer;
