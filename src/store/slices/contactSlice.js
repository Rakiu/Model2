import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {axiosInstance} from "../../api/axiosInstance";

import {
  CREATE_CONTACT_URL,
  GET_ALL_CONTACTS_URL,
  GET_CONTACT_BY_ID_URL,
  DELETE_CONTACT_URL,
  TOGGLE_CONTACT_STATUS_URL,
} from "../../api/constant/constant";

/* ======================================================
   CREATE CONTACT (Public)
====================================================== */
export const createContactThunk = createAsyncThunk(
  "contact/create",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(CREATE_CONTACT_URL, formData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to submit contact form");
    }
  }
);

/* ======================================================
   GET ALL CONTACTS (Admin)
====================================================== */
export const getAllContactsThunk = createAsyncThunk(
  "contact/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(GET_ALL_CONTACTS_URL);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch contacts");
    }
  }
);

/* ======================================================
   GET SINGLE CONTACT BY ID (Admin)
====================================================== */
export const getContactByIdThunk = createAsyncThunk(
  "contact/getById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`${GET_CONTACT_BY_ID_URL}/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch contact details");
    }
  }
);

/* ======================================================
   DELETE CONTACT (Admin)
====================================================== */
export const deleteContactThunk = createAsyncThunk(
  "contact/delete",
  async ({ id }, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`${DELETE_CONTACT_URL}/${id}`);
      return id; // return deleted ID
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete contact");
    }
  }
);

/* ======================================================
   TOGGLE STATUS (New → Seen → Resolved)
====================================================== */
export const toggleContactStatusThunk = createAsyncThunk(
  "contact/status",
  async ({ id }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.patch(`${TOGGLE_CONTACT_STATUS_URL}/${id}`);
      return { id, status: data.status };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update status");
    }
  }
);

/* ======================================================
   SLICE
====================================================== */
const contactSlice = createSlice({
  name: "contact",
  initialState: {
    loading: false,
    error: null,
    contacts: [],
    singleContact: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      /* CREATE CONTACT */
      .addCase(createContactThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createContactThunk.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(createContactThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* GET ALL CONTACTS */
      .addCase(getAllContactsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllContactsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload;
      })
      .addCase(getAllContactsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* GET SINGLE CONTACT */
      .addCase(getContactByIdThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getContactByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.singleContact = action.payload;
      })
      .addCase(getContactByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* DELETE CONTACT */
      .addCase(deleteContactThunk.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter((c) => c._id !== action.payload);
      })

      /* TOGGLE STATUS */
      .addCase(toggleContactStatusThunk.fulfilled, (state, action) => {
        const updated = state.contacts.find((c) => c._id === action.payload.id);
        if (updated) updated.status = action.payload.status;
      });
  },
});

export default contactSlice.reducer;
