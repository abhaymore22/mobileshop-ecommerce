import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axiosInstance';

// Create contact
export const createContact = createAsyncThunk(
  'contact/create',
  async (contactData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/api/contact', contactData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to submit contact form'
      );
    }
  }
);

// Get all contacts (Admin/Staff)
export const getAllContacts = createAsyncThunk(
  'contact/getAll',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams(filters).toString();
      const { data } = await axios.get(`/api/contact?${params}`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch contacts'
      );
    }
  }
);

// Get contact by ID
export const getContactById = createAsyncThunk(
  'contact/getById',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/contact/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch contact'
      );
    }
  }
);

// Get my contacts
export const getMyContacts = createAsyncThunk(
  'contact/getMy',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/api/contact/my-contacts');
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch your contacts'
      );
    }
  }
);

// Update contact
export const updateContact = createAsyncThunk(
  'contact/update',
  async ({ id, updateData }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/api/contact/${id}`, updateData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update contact'
      );
    }
  }
);

// Delete contact
export const deleteContact = createAsyncThunk(
  'contact/delete',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/contact/${id}`);
      return { ...data, id };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete contact'
      );
    }
  }
);

// Get contact stats
export const getContactStats = createAsyncThunk(
  'contact/getStats',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/api/contact/stats');
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch contact statistics'
      );
    }
  }
);

const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    contacts: [],
    myContacts: [],
    currentContact: null,
    stats: null,
    loading: false,
    error: null,
    success: false,
    message: null
  },
  reducers: {
    clearContactError: (state) => {
      state.error = null;
    },
    clearContactSuccess: (state) => {
      state.success = false;
      state.message = null;
    },
    clearCurrentContact: (state) => {
      state.currentContact = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Create contact
      .addCase(createContact.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createContact.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      })
      .addCase(createContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get all contacts
      .addCase(getAllContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload.contacts;
      })
      .addCase(getAllContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get contact by ID
      .addCase(getContactById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getContactById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentContact = action.payload.contact;
      })
      .addCase(getContactById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get my contacts
      .addCase(getMyContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.myContacts = action.payload.contacts;
      })
      .addCase(getMyContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update contact
      .addCase(updateContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
        state.currentContact = action.payload.contact;
        // Update in contacts array
        const index = state.contacts.findIndex(c => c._id === action.payload.contact._id);
        if (index !== -1) {
          state.contacts[index] = action.payload.contact;
        }
      })
      .addCase(updateContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete contact
      .addCase(deleteContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
        state.contacts = state.contacts.filter(c => c._id !== action.payload.id);
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get contact stats
      .addCase(getContactStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getContactStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload.stats;
      })
      .addCase(getContactStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearContactError, clearContactSuccess, clearCurrentContact } = contactSlice.actions;
export default contactSlice.reducer;
