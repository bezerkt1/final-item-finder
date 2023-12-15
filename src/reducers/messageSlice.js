import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../config/config";

// placeholder data for items
const initialState = {
  threads: [],
  selectedThread: false,
  isLoading: true,
};

// helper function
const fetchThread = async (threadId, headers) => {
  const response = await fetch(`${API_URL}/threads/${threadId}`, { headers });
  if (!response.ok) {
    throw new Error("Response was not ok");
  }
  const messages = await response.json();
  return {
    threadId,
    messages,
  };
};

export const getThreads = createAsyncThunk(
  "messages/getThreads",
  async (payload, thunkAPI) => {
    const state = thunkAPI.getState();
    const headers = new Headers({
      "Content-Type": "application/json",
      Authorization: `${state.login.token_type} ${state.login.access_token}`,
    });

    try {
      const response = await fetch(`${API_URL}/threads/me`, { headers });
      if (!response.ok) {
        throw new Error("Response was not ok");
      }

      const threadIds = await response.json();

      const threads = await Promise.all(
        threadIds.map((thread) => fetchThread(thread.id, headers))
      );

      var allUserIds = [];
      threads.forEach(thread => {
        thread.messages.forEach(msg => {
          if (!allUserIds.includes(msg.user_id)) {
            allUserIds.push(msg.user_id);
          }
        });
      });
    
      const members = await Promise.all(
        allUserIds.map(userId => fetch(`${API_URL}/users/${userId}`, { headers })
          .then(response => response.json())
        )
      );
      
      return threads.map(thread => {
        // Get unique user_ids
        const userIds = [...new Set(thread.messages.map(msg => msg.user_id))];
        const threadMembers = members.filter(member => 
          thread.messages.some(msg => msg.user_id === member.id)
        );

        return {
          threadId: thread.threadId,
          messages: thread.messages,
          userIds: userIds,
          threadMembers: threadMembers
        }
      })
    
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

export const sendMessage = createAsyncThunk(
  "messages/sendMessage",
  async (payload, thunkAPI) => {
    const state = thunkAPI.getState();
    try {
      return fetch(`${API_URL}/messages/${payload.userId}`, {
        method: "POST",
        body: JSON.stringify({ message: payload.message }),
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `${state.login.token_type} ${state.login.access_token}`,
        }),
      }).then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      });
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

const messageSlice = createSlice({
  name: "messages",
  initialState: initialState,
  reducers: {
    setSelectedThread: (state, action) => {
      state.selectedThread = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.fulfilled, (state, action) => {
        console.log("Message sent");
        const { threadId, message, senderUserId } = action.meta.arg;

        // Find the thread to update
        const threadIndex = state.threads.findIndex(
          (t) => t.threadId === threadId
        );
        if (threadIndex !== -1) {
          // Update the thread with the new message
          state.threads[threadIndex].messages.push({
            message,
            threadId,
            userId: senderUserId,
          });
        }
      })
      .addCase(getThreads.fulfilled, (state, action) => {
        state.threads = action.payload;
      });
  },
});

export const { setSelectedThread } = messageSlice.actions;
export default messageSlice.reducer;
