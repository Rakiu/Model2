import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axiosInstance";
import { LOGIN_ADMIN_URL } from "../../api/constant/constant";

// Thunk for Admin Login
export const adminLogin = createAsyncThunk(
  "admin/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(LOGIN_ADMIN_URL, {
        email,
        password,
      });

      return res.data; // {token, role}
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed. Try again."
      );
    }
  }
);

const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState: {
    token: localStorage.getItem("tokenId") || null,
    role: localStorage.getItem("role") || null,
    loading: false,
    error: null,
  },

  reducers: {
    adminLogout: (state) => {
      state.token = null;
      state.role = null;

      localStorage.removeItem("tokenId");
      localStorage.removeItem("role");
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(adminLogin.fulfilled, (state, action) => {
        state.loading = false;

        state.token = action.payload.token;
        state.role = action.payload.role;

        localStorage.setItem("tokenId", action.payload.token);
        localStorage.setItem("role", action.payload.role);
      })

      .addCase(adminLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { adminLogout } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
