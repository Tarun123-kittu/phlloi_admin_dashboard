import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_CONFIG } from "@/config/app_config";

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
  data: RoomState[];
}

const initialState: RoomTypes = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: null,
  data: [],
};

export const get_all_rooms = createAsyncThunk<
  RoomState[],
  void, 
  { rejectValue: string } 
>("get_all_rooms", async (_, thunkAPI) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("phloii_token"));

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    const response = await fetch(`${API_CONFIG.BASE_URL}get_explore_rooms`, requestOptions);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch rooms");
    }

    const data = await response.json();
    return data.data as RoomState[]; 
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message || "An error occurred while fetching rooms.");
  }
});

const roomSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    clearRoomState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(get_all_rooms.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(get_all_rooms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
      })
      .addCase(get_all_rooms.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload || "Failed to load rooms.";
      });
  },
});

export const { clearRoomState } = roomSlice.actions;
export default roomSlice.reducer;
