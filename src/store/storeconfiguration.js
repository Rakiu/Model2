import { configureStore } from "@reduxjs/toolkit";

import adminAuthReducer from "./slices/adminAuthSlice";
import cityReducer from "./slices/citySlice";
import girlReducer from "./slices/girlSlice";
import stateReducer from "./slices/stateSlice";
import contactReducer from "./slices/contactSlice";  // ⭐ ADD THIS

export const store = configureStore({
  reducer: {
    adminAuth: adminAuthReducer,
    city: cityReducer,
    girls: girlReducer,
    states: stateReducer,
    contacts: contactReducer,   // ⭐ REGISTER CONTACT SLICE
  },
});
