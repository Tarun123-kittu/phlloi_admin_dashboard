import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_CONFIG } from "@/config/app_config";

export interface ForgotPasswordState {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    error: any;
    message: string | null;
}

const initialState: ForgotPasswordState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    error: null,
    message: null
}

export const Forgot_Password = createAsyncThunk("ForgotPassword", async ({ email }: { email: string }, thunkAPI) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "email": email
        });

        const response = await fetch(`${API_CONFIG.BASE_URL}forget_password`, {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        })
        if (!response.ok) {
            const errorMessage = await response.json().catch(() => ({ message: "An unknown error occurred" }));
            throw new Error(errorMessage.message || "An error occurred");
        }

        const data = await response.json();
        if (data.type === "success" && data.message) {
            return data.message;
        } else {
            throw new Error(data.message || "Unexpected response format");
        }
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message || "An error occurred");
    }
})

const forgot_password_state = createSlice({
    name: "forgot_password_state",
    initialState,
    reducers: {
        clear_forgot_password_state: () => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(Forgot_Password.pending, (state) => {
                state.isLoading = true
            })
            .addCase(Forgot_Password.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload
            })
            .addCase(Forgot_Password.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload
            })
    }
})

export const { clear_forgot_password_state } = forgot_password_state.actions;

export default forgot_password_state.reducer;