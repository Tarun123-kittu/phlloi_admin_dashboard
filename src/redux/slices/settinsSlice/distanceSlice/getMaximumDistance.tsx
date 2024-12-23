import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_CONFIG } from "@/config/app_config";

interface maxDistance {
  _id: string;
  maximum_distance: number;
}

interface initialStateProps {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: string | null;
  data: maxDistance | null;
}

const initialState: initialStateProps = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: null,
  data: null,
};

export const get_maximum_distance = createAsyncThunk<
  maxDistance, 
  void, 
  { rejectValue: string } 
>("get_maximum_distance", async (_, thunkAPI) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("phloii_token"));

    const response = await fetch(
      `${API_CONFIG.BASE_URL}get_maximum_distance_by_admin`,
      {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      }
    );

    if (!response.ok) {
      const errorMessage = await response.json();
      throw new Error(errorMessage.message || "Failed to fetch maximum distance");
    }

    const data = await response.json();
    if (data.type === "success") {
      return data.data as maxDistance;
    } else {
      throw new Error(data.message || "Request failed");
    }
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message || "An error occurred");
  }
});

const getMaximumDistanceAPI = createSlice({
  name: "getMaximumDistanceAPI",
  initialState,
  reducers: {
    clear_max_distance_state: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(get_maximum_distance.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(get_maximum_distance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
      })
      .addCase(get_maximum_distance.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload as string;
      });
  },
});

export const { clear_max_distance_state } = getMaximumDistanceAPI.actions;
export default getMaximumDistanceAPI.reducer;
