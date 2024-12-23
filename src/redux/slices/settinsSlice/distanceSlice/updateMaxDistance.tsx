import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_CONFIG } from "@/config/app_config";

interface initialStateProps {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: string | null;
  message: string | null;
}

const initialState: initialStateProps = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: null,
  message: null,
};

export const update_max_distance = createAsyncThunk<
  string, 
  { maximum_distance: number }, 
  { rejectValue: string } 
>(
  "update_max_distance",
  async ({ maximum_distance }, thunkAPI) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Bearer " + localStorage.getItem("phloii_token"));

      const requestBody = JSON.stringify({ maximum_distance });

      const response = await fetch(
        `${API_CONFIG.BASE_URL}update_maximum_distance_preference`,
        {
          method: "PUT",
          headers: myHeaders,
          body: requestBody,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update maximum distance.");
      }

      const result = await response.json();
      return result.message || "Maximum distance updated successfully.";
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "An error occurred while updating.");
    }
  }
);

const updateMaxDistanceSlice = createSlice({
  name: "updateMaxDistance",
  initialState,
  reducers: {
    clearUpdateState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(update_max_distance.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
        state.isSuccess = false;
        state.message = null;
      })
      .addCase(update_max_distance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(update_max_distance.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload || "Something went wrong.";
      });
  },
});

export const { clearUpdateState } = updateMaxDistanceSlice.actions;
export default updateMaxDistanceSlice.reducer;
