import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface Pagination {
  currentPage: number;
  totalPages: number;
}

export interface UserData {
  _id : string;
  username: string;
  email: string;
  dob: number;
  gender: string;
  online_status: boolean;
  verified_profile: boolean;
}

export interface UserState {
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
  isError: boolean;
  users: {
    pagination: Pagination;
    users: UserData[];
  } | null;
}


const initialState: UserState = {
  isLoading: false,
  error: null,
  isSuccess: false,
  isError: false,
  users: null,
};

export const UsersList = createAsyncThunk(
  "UsersList",
  async ({ page }: { page: number }, thunkAPI) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + localStorage.getItem('phloii_token'));
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}get_all_users?page=${page}`, {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        if (errorMessage) {
          throw new Error(errorMessage.message);
        }
      }

      const data = await response.json();
      if (data.type === "success") {
        return data.data;
      } else {
        throw new Error(data.message || "Request failed");
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "An error occurred");
    }
  }
);

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    clear_all_user_state : () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(UsersList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(UsersList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(UsersList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isError = true
      });
  },
});
export const {clear_all_user_state} = userSlice.actions
export default userSlice.reducer;
