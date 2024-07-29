import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from "./features/contacts/contactSlice.jsx";
import filterReducer from "./features/filter/filterSlice.jsx";
import authReducer from "./features/auth/authSlice.jsx";

const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filter: filterReducer,
    auth: authReducer,
  },
});

export default store;
