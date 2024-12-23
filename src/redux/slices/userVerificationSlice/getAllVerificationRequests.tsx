import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_CONFIG } from "../../../../src/config/app_config";

export interface Pagination {
    currentPage: number;
    totalPages: number;
}

export interface UserVerificationData {
    _id : string;
    username: string;
    dob: number;
    gender: string;
    online_status: boolean;
}

export interface UserState {
    isLoading: boolean;
    error: string | null;
    isSuccess: boolean;
    isError: boolean;
    verification_data: {
        pagination: Pagination;
        users: UserVerificationData[];
    } | null;
}


const initialState: UserState = {
    isLoading: false,
    error: null,
    isSuccess: false,
    isError: false,
    verification_data: null,
};

export const VerificationListAPI = createAsyncThunk(
    "VerificationList",
    async ({ page }: { page: number }, thunkAPI) => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + localStorage.getItem('phloii_token'));
            const response = await fetch(`${API_CONFIG.BASE_URL}get_profile_verification_requests?page=${page}`, {
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

const userVerificationListSlice = createSlice({
    name: "userVerificationListSlice",
    initialState,
    reducers: {
        clear_varification_list_state : () =>initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(VerificationListAPI.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(VerificationListAPI.fulfilled, (state, action) => {
                state.isLoading = false;
                state.verification_data = action.payload;
            })
            .addCase(VerificationListAPI.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
                state.isError = true
            });
    },
});
export const {clear_varification_list_state} = userVerificationListSlice.actions
export default userVerificationListSlice.reducer;
