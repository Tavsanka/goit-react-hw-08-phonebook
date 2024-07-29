import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://connections-api.goit.global";

// Thunks
export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const { token } = state.auth;

    try {
      const response = await axios.get(`${API_URL}/contacts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async ({ contact }, { getState, rejectWithValue }) => {
    const state = getState();
    const { token } = state.auth;

    try {
      const response = await axios.post(`${API_URL}/contacts`, contact, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async ({ id }, { getState, rejectWithValue }) => {
    const state = getState();
    const { token } = state.auth;

    try {
      await axios.delete(`${API_URL}/contacts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const updateContact = createAsyncThunk(
  "contacts/updateContact",
  async ({ id, contact }, { getState, rejectWithValue }) => {
    const { token } = getState().auth;

    try {
      const response = await axios.patch(`${API_URL}/contacts/${id}`, contact, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
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
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        const index = state.findIndex(
          (contact) => contact.id === action.payload.id,
        );
        if (index !== -1) {
          state[index] = action.payload;
        }
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        console.error("Fetch contacts failed:", action.payload);
      })
      .addCase(addContact.rejected, (state, action) => {
        console.error("Add contact failed:", action.payload);
      })
      .addCase(deleteContact.rejected, (state, action) => {
        console.error("Delete contact failed:", action.payload);
      })
      .addCase(updateContact.rejected, (state, action) => {
        console.error("Update contact failed:", action.payload);
      });
  },
});

export default contactSlice.reducer;
