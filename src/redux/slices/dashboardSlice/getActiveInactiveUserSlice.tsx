import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_CONFIG } from "../../../../src/config/app_config";

interface ActiveInactiveUserState {
    data: [
        number[], 
        string[]  
      ];
  
}

interface InitialStateTypes {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: string | null;
  data: ActiveInactiveUserState[];
}

const initialState: InitialStateTypes = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  data: [],
  error: null,
};

export const get_active_inactive_users = createAsyncThunk<
  ActiveInactiveUserState[], 
  void, 
  { rejectValue: string }
>("get_active_inactive_users", async (_, { rejectWithValue }) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem('phloii_token'));

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow" as RequestRedirect,
    };

    const response = await fetch(
      `${API_CONFIG.BASE_URL}/active_inactive_users`,
      requestOptions
    );

    if (!response.ok) {
      return rejectWithValue("Failed to fetch active/inactive users");
    }

    const result = await response.json();
    // Return the data in the correct structure
    return [
      {
        data: result.data.data as [
          number[], 
          string[]
        ],
      },
    ];
  } catch (error) {
    return rejectWithValue("An error occurred while fetching active/inactive users");
  }
});


const activeInactiveUsersSlice = createSlice({
  name: "activeInactiveUsersSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(get_active_inactive_users.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(get_active_inactive_users.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
      })
      .addCase(get_active_inactive_users.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload || "An unexpected error occurred";
      });
  },
});

export default activeInactiveUsersSlice.reducer;
