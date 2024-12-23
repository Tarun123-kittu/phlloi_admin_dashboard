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

export const update_room = createAsyncThunk<
  string, 
  { room: string; image: string; id: string },
  { rejectValue: string } 
>(
  "update_room",
  async ({ room, image, id }, thunkAPI) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + localStorage.getItem("phloii_token"));

      const formData = new FormData();
      formData.append("roomId", id);
      formData.append("room", room);
      formData.append("image", image);

      const requestOptions: RequestInit = {
        method: "PUT",
        headers: myHeaders,
        body: formData,
        redirect: "follow",
      };

      const response = await fetch(
        `${API_CONFIG.BASE_URL}update_explore_room`,
        requestOptions
      );

      if (!response.ok) {
        const errorData = await response.json();
        return thunkAPI.rejectWithValue(errorData.message || "Failed to update the room.");
      }

      const result = await response.json();
      return result.message;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "An error occurred while updating.");
    }
  }
);

const updateRoomAPI = createSlice({
  name: "updateRoomAPI",
  initialState,
  reducers: {
    clearUpdateState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(update_room.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
        state.isSuccess = false;
        state.message = null;
      })
      .addCase(update_room.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(update_room.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload || "Something went wrong.";
      });
  },
});

export const { clearUpdateState } = updateRoomAPI.actions;
export default updateRoomAPI.reducer;
