import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL =
  "https://6697b6ee02f3150fb66eb342.mockapi.io/live_UgVCYy4usqmKy3CIngcdFOebz8GEiRBrHMS0Fenl9kOM8Bsw5WiV4OcAoyP1XpvX/contacts";

// Thunks
export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (contact) => {
    const response = await axios.post(API_URL, contact);
    return response.data;
  },
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId) => {
    await axios.delete(`${API_URL}/${contactId}`);
    return contactId;
  },
);

const contactSlice = createSlice({
  name: "contacts",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        return state.filter((contact) => contact.id !== action.payload);
      });
  },
});

export default contactSlice.reducer;
