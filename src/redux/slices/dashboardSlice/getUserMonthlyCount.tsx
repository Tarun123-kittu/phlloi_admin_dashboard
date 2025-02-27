import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_CONFIG } from "../../../../src/config/app_config";

interface MonthlyJoinedUsersState {
  userCounts: number[];
  months: string[];
}

interface InitialStateTypes {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: string | null;
  data: MonthlyJoinedUsersState | null;
}

const initialState: InitialStateTypes = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  data: null,
  error: null,
};

export const user_monthly_joined = createAsyncThunk<
  MonthlyJoinedUsersState, 
  { year: number }, 
  { rejectValue: string }
>("user_monthly_joined", async ({ year }, { rejectWithValue }) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem('phloii_token'));

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow" as RequestRedirect,
    };

    const response = await fetch(
      `${API_CONFIG.BASE_URL}monthly_joined_users?year=${year}`,
      requestOptions
    );

    if (!response.ok) {
      return rejectWithValue("Failed to fetch monthly joined users");
    }

    const result = await response.json();
    const userCounts: number[] = [];
    const months: string[] = [];

    result.data.forEach((item: { count: number, month: string }) => {
      userCounts.push(item.count);
      months.push(item.month);
    });

    return { userCounts, months };
  } catch (error) {
    return rejectWithValue("An error occurred while fetching monthly joined users");
  }
});


const monthlyJoinedSlice = createSlice({
  name: "monthlyJoinedUsers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(user_monthly_joined.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(user_monthly_joined.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
      })
      .addCase(user_monthly_joined.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload || "An unexpected error occurred";
      });
  },
});

export default monthlyJoinedSlice.reducer;
