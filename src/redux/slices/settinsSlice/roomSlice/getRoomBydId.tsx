import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_CONFIG } from "../../../../../src/config/app_config";

interface RoomState {
  _id: string;
  room: string;
  image: string;
  joined_user_count: number;
}

interface RoomTypes {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: string | null;
  data: any;
}

const initialState: RoomTypes = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: null,
  data: {} as RoomState,
};

export const get_room_by_id = createAsyncThunk<
  RoomState, 
  { id: string }, 
  { rejectValue: string } 
>("get_room_by_id", async ({ id }, thunkAPI) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("phloii_token"));

    const response = await fetch(
      `${API_CONFIG.BASE_URL}get_expore_room?roomId=${id}`,
      {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      }
    );

    if (!response.ok) {
      const error = await response.json();
      return thunkAPI.rejectWithValue(error.message || "Failed to fetch room data");
    }

    const result: RoomState = await response.json();
    return result;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message || "An error occurred");
  }
});

const getRoomByIdAPI = createSlice({
  name: "getRoomByIdAPI",
  initialState,
  reducers: {
    clearGetRoomState: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.error = null;
      state.data = {} as RoomState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(get_room_by_id.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.error = null;
      })
      .addCase(get_room_by_id.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.data = action.payload;
      })
      .addCase(get_room_by_id.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.error = action.payload as string;
      });
  },
});

export const { clearGetRoomState } = getRoomByIdAPI.actions;
export default getRoomByIdAPI.reducer;
