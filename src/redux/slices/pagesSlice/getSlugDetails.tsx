import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// Define the Page type based on the provided data structure
interface Page {
  title: string;
  content: string;
  slug: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

interface SliceState {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  error: string | null;
  data: Page | null;
}

export const initialState: SliceState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  error: null,
  data: null,
};

// Define the async thunk
export const get_slug_details = createAsyncThunk<Page, { slugName: string }>(
  "get_slug_details",
  async ({ slugName }, thunkAPI) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}get_page_by_slug?slug=${slugName}`,
        {
          method: "GET",
          redirect: "follow",
        }
      );

      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage?.message || "Unknown error occurred");
      }

      const data = await response.json();
      if (data.type === "success") {
        return data.data as Page;
      } else {
        throw new Error(data.message || "Request failed");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(
        (error as Error).message || "An error occurred"
      );
    }
  }
);

// Create the slice
const getSlugDetails = createSlice({
  name: "getSlugDetails",
  initialState,
  reducers: {
    clear_get_slug_details: () => initialState, // Reset state
  },
  extraReducers: (builder) => {
    builder
      .addCase(get_slug_details.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.error = null;
        state.data = null;
      })
      .addCase(get_slug_details.fulfilled, (state, action: PayloadAction<Page>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.data = action.payload;
      })
      .addCase(get_slug_details.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions and reducer
export const { clear_get_slug_details } = getSlugDetails.actions;
export default getSlugDetails.reducer;
