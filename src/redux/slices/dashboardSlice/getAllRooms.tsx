import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_CONFIG } from "../../../../src/config/app_config";

interface RoomsState {
  _id: string;
  room: string;
  image: string;
  joined_user_count: number;
}

interface InitialStateTypes {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: string | null;
  data: RoomsState[];
}

const initialState: InitialStateTypes = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  data: [],
  error: null,
};

export const get_all_dashboard_rooms = createAsyncThunk<
  RoomsState[], 
  void, 
  { rejectValue: string } 
>("get_all_dashboard_rooms", async (_, { rejectWithValue }) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem('phloii_token'));

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow" as RequestRedirect,
    };

    const response = await fetch(
      `${API_CONFIG.BASE_URL}explore_rooms_joinedUsers`,
      requestOptions
    );

    if (!response.ok) {
      return rejectWithValue("Failed to fetch rooms");
    }

    const result = await response.json(); 
    return result.data; 
  } catch (error) {
    return rejectWithValue("An error occurred while fetching rooms");
  }
});

const getAllDashboardRooms = createSlice({
  name: "getAllDashboardRooms",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(get_all_dashboard_rooms.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(get_all_dashboard_rooms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
      })
      .addCase(get_all_dashboard_rooms.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload || "An unexpected error occurred";
      });
  },
});

export default getAllDashboardRooms.reducer;
