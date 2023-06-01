import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../ServerConfigs";

// create event
export const createEvent = createAsyncThunk(
  "event/createEvent",
  async (newForm, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };

      const { data } = await axios.post(
        `${server}/event/create-event`,
        newForm,
        config
      );

      return data.event;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// get all events of a shop
export const getAllEventsOfShop = createAsyncThunk(
  "event/getAllEventsOfShop",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${server}/event/get-all-events/${id}`);

      return data.events;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// delete event of a shop
export const deleteEvent = createAsyncThunk(
  "event/deleteEvent",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        `${server}/event/delete-shop-event/${id}`,
        {
          withCredentials: true,
        }
      );

      return data.message;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// get all events
export const getAllEvents = createAsyncThunk(
  "event/getAllEvents",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${server}/event/get-all-events`);

      return data.events;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  isLoading: true,
};

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createEvent.pending, (state) => {
        state.isLoading = true;
        state.eventSuccess = false;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.events.push(action.payload)
        state.eventSuccess = true;
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.eventSuccess = false;
      })
      .addCase(getAllEventsOfShop.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllEventsOfShop.fulfilled, (state, action) => {
        state.isLoading = false;
        state.events = action.payload;
      })
      .addCase(getAllEventsOfShop.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteEvent.pending, (state) => {
        state.isLoading = true;
      })
      // .addCase(deleteEvent.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.message = action.payload;
      // })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        const deletedEventId = action.meta.arg;
        state.events = state.events.filter((event) => event._id !== deletedEventId);
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getAllEvents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.events = action.payload;
      })
      .addCase(getAllEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});


export const eventReducer = eventSlice.reducer;
