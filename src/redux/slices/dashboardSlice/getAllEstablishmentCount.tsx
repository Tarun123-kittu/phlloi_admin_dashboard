import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_CONFIG } from "../../../../src/config/app_config";

interface ActiveInactiveUserState {
    data: number;
}

interface InitialStateTypes {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: string | null;
  data: number;
}

const initialState: InitialStateTypes = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  data: 0,
  error: null,
};

export const get_all_establishment_count = createAsyncThunk<
  ActiveInactiveUserState, 
  void, 
  { rejectValue: string }
>("get_all_establishment_count", async (_, { rejectWithValue }) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem('phloii_token'));

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow" as RequestRedirect,
    };

    const response = await fetch(
      `${API_CONFIG.BASE_URL}get_all_establishments_count`,
      requestOptions
    );

    if (!response.ok) {
      return rejectWithValue("Failed to fetch establishment count");
    }

    const result = await response.json();
    return {
      data: result?.data as number,
    };
  } catch (error) {
    return rejectWithValue("An error occurred while fetching establishment count");
  }
});

const GetAllEstablishmentCountSlice = createSlice({
  name: "GetAllEstablishmentCountSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(get_all_establishment_count.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(get_all_establishment_count.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload.data;
      })
      .addCase(get_all_establishment_count.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload || "An unexpected error occurred";
      });
  },
});

export default GetAllEstablishmentCountSlice.reducer;
