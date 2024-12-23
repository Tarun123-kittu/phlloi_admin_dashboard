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

  export const add_room = createAsyncThunk<
  string,
  {room : string,image:string},
  { rejectValue: string } 
  >("add_room",async({room,image},thunkAPI) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("phloii_token"));

const formdata = new FormData();
formdata.append("room", room);
formdata.append("image", image);

const response = await fetch(`${API_CONFIG.BASE_URL}add_explore_room`, {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow"
  })
  if (!response.ok) {
    const errorData = await response.json();
    return thunkAPI.rejectWithValue(errorData.message || "Failed to update the room.");
  }

  const result = await response.json();
  return result.message;
} catch (error: any) {
  return thunkAPI.rejectWithValue(error.message || "An error occurred while updating.");
}
  })

  const AddRoomAPI = createSlice({
    name: "AddRoomAPI",
    initialState,
    reducers: {
        clearAddRoomState: () => initialState,
    },
    extraReducers: (builder) => {
      builder
        .addCase(add_room.pending, (state) => {
          state.isLoading = true;
          state.isError = false;
          state.error = null;
          state.isSuccess = false;
          state.message = null;
        })
        .addCase(add_room.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.message = action.payload;
        })
        .addCase(add_room.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.error = action.payload || "Something went wrong.";
        });
    },
  });
  
  export const { clearAddRoomState } = AddRoomAPI.actions;
  export default AddRoomAPI.reducer;