import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {axiosInstance} from "../../api/axiosInstance";

import {
  ADD_STATE_URL,
  GET_STATES_URL,
  GET_STATE_BY_ID_URL,
  UPDATE_STATE_URL,
  DELETE_STATE_URL,
  TOGGLE_STATE_STATUS_URL,
} from "../../api/constant/constant";

// ======================================================
//  CREATE STATE 
// ======================================================
export const createStateThunk = createAsyncThunk(
  "states/create",
  async ({ name, status }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(ADD_STATE_URL, { name, status });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
  }
);

// ======================================================
//  GET ALL STATES 
// ======================================================
export const getStatesThunk = createAsyncThunk(
  "states/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(GET_STATES_URL);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch states");
    }
  }
);

// ======================================================
//  GET STATE BY ID 
// ======================================================
export const getStateByIdThunk = createAsyncThunk(
  "states/getById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`${GET_STATE_BY_ID_URL}/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "State not found");
    }
  }
);

// ======================================================
//  UPDATE STATE 
// ======================================================
export const updateStateThunk = createAsyncThunk(
  "states/update",
  async ({ id, name, status }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(`${UPDATE_STATE_URL}/${id}`, {
        name,
        status,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Update failed");
    }
  }
);

// ======================================================
//  DELETE STATE 
// ======================================================
export const deleteStateThunk = createAsyncThunk(
  "states/delete",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(`${DELETE_STATE_URL}/${id}`);
      return { id, ...data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Delete failed");
    }
  }
);

// ======================================================
//  TOGGLE STATUS 
// ======================================================
export const toggleStateStatusThunk = createAsyncThunk(
  "states/toggleStatus",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.patch(`${TOGGLE_STATE_STATUS_URL}/${id}`);
      return { id, status: data.status };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Status change failed");
    }
  }
);

// ======================================================
//  SLICE
// ======================================================
const stateSlice = createSlice({
  name: "states",
  initialState: {
    states: [],
    singleState: null,
    loading: false,
    message: null,
  },

  reducers: {
    clearStateMessage: (state) => {
      state.message = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // CREATE
      .addCase(createStateThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createStateThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.message = { type: "success", text: action.payload.message };
        state.states.push(action.payload.data);
      })
      .addCase(createStateThunk.rejected, (state, action) => {
        state.loading = false;
        state.message = { type: "error", text: action.payload };
      })

      // GET ALL
      .addCase(getStatesThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStatesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.states = action.payload;
      })
      .addCase(getStatesThunk.rejected, (state, action) => {
        state.loading = false;
        state.message = { type: "error", text: action.payload };
      })

      // GET BY ID
      .addCase(getStateByIdThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStateByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.singleState = action.payload;
      })
      .addCase(getStateByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.message = { type: "error", text: action.payload };
      })

      // UPDATE
      .addCase(updateStateThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateStateThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.message = { type: "success", text: "State updated successfully" };

        state.states = state.states.map((item) =>
          item._id === action.payload.data._id ? action.payload.data : item
        );
      })
      .addCase(updateStateThunk.rejected, (state, action) => {
        state.loading = false;
        state.message = { type: "error", text: action.payload };
      })

      // DELETE
      .addCase(deleteStateThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteStateThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.message = { type: "success", text: "State deleted" };

        state.states = state.states.filter(
          (item) => item._id !== action.payload.id
        );
      })
      .addCase(deleteStateThunk.rejected, (state, action) => {
        state.loading = false;
        state.message = { type: "error", text: action.payload };
      })

      // TOGGLE STATUS
      .addCase(toggleStateStatusThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleStateStatusThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.message = { type: "success", text: "Status updated" };

        state.states = state.states.map((item) =>
          item._id === action.payload.id
            ? { ...item, status: action.payload.status }
            : item
        );
      })
      .addCase(toggleStateStatusThunk.rejected, (state, action) => {
        state.loading = false;
        state.message = { type: "error", text: action.payload };
      });
  },
});

export const { clearStateMessage } = stateSlice.actions;
export default stateSlice.reducer;
