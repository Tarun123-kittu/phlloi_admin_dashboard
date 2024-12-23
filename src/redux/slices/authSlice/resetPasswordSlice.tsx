import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_CONFIG } from "../../../../src/config/app_config";

export interface ResetPassword {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    error: any;
    message: string | null;
}

const initialState: ResetPassword = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    error: null,
    message: null,
};

export const reset_password = createAsyncThunk("reset_password", async ({ email, password, confirmPassword }: { email: string, password: string, confirmPassword: string }, thunkAPI) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "email": email,
            "password": password,
            "confirmPassword": confirmPassword
        });

        const response = await fetch(`${API_CONFIG.BASE_URL}reset_password`, {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        })
        if (!response.ok) {
            const errorMessage = await response.json();
            throw new Error(errorMessage.message || "Failed to resend OTP");
        }

        const data = await response.json();
        return data;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message || "An error occurred");
    }
})

const ResetPasswordState = createSlice({
    name: "ResetPasswordState",
    initialState,
    reducers: {
        clear_reset_password_state: () => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(reset_password.pending, (state) => {
                state.isLoading = true
            })
            .addCase(reset_password.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(reset_password.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.error = action.payload
            })
    }
})
export const { clear_reset_password_state } = ResetPasswordState.actions
export default ResetPasswordState.reducer