import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axiosInstance';

// Send message to chatbot
export const sendChatMessage = createAsyncThunk(
  'chatbot/sendMessage',
  async ({ message, sessionID }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/api/chatbot/message', {
        message,
        sessionID
      });
      return { ...data, userMessage: message };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to send message'
      );
    }
  }
);

// Get chat history
export const getChatHistory = createAsyncThunk(
  'chatbot/getHistory',
  async (sessionID, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/chatbot/history/${sessionID}`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch chat history'
      );
    }
  }
);

// Get all chat sessions (Admin)
export const getAllChatSessions = createAsyncThunk(
  'chatbot/getSessions',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/api/chatbot/sessions');
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch chat sessions'
      );
    }
  }
);

// Get chatbot analytics (Admin)
export const getChatbotAnalytics = createAsyncThunk(
  'chatbot/getAnalytics',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/api/chatbot/analytics');
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch analytics'
      );
    }
  }
);

const chatbotSlice = createSlice({
  name: 'chatbot',
  initialState: {
    messages: [],
    sessions: [],
    analytics: null,
    loading: false,
    error: null,
    isOpen: false,
    sessionID: null
  },
  reducers: {
    toggleChatbot: (state) => {
      state.isOpen = !state.isOpen;
    },
    openChatbot: (state) => {
      state.isOpen = true;
    },
    closeChatbot: (state) => {
      state.isOpen = false;
    },
    setSessionID: (state, action) => {
      state.sessionID = action.payload;
    },
    clearMessages: (state) => {
      state.messages = [];
    },
    clearChatbotError: (state) => {
      state.error = null;
    },
    addUserMessage: (state, action) => {
      state.messages.push({
        type: 'user',
        content: action.payload,
        timestamp: new Date().toISOString()
      });
    }
  },
  extraReducers: (builder) => {
    builder
      // Send message
      .addCase(sendChatMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendChatMessage.fulfilled, (state, action) => {
        state.loading = false;
        // Add bot response to messages
        state.messages.push({
          type: 'bot',
          content: action.payload.response,
          intent: action.payload.intent,
          timestamp: new Date().toISOString()
        });
      })
      .addCase(sendChatMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get chat history
      .addCase(getChatHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getChatHistory.fulfilled, (state, action) => {
        state.loading = false;
        // Convert history to message format
        const messages = [];
        action.payload.messages.forEach(msg => {
          messages.push({
            type: 'user',
            content: msg.message,
            timestamp: msg.createdAt
          });
          messages.push({
            type: 'bot',
            content: msg.response,
            intent: msg.intent,
            timestamp: msg.createdAt
          });
        });
        state.messages = messages;
      })
      .addCase(getChatHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get all sessions
      .addCase(getAllChatSessions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllChatSessions.fulfilled, (state, action) => {
        state.loading = false;
        state.sessions = action.payload.sessions;
      })
      .addCase(getAllChatSessions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get analytics
      .addCase(getChatbotAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getChatbotAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.analytics = action.payload.analytics;
      })
      .addCase(getChatbotAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const {
  toggleChatbot,
  openChatbot,
  closeChatbot,
  setSessionID,
  clearMessages,
  clearChatbotError,
  addUserMessage
} = chatbotSlice.actions;

export default chatbotSlice.reducer;
