import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface ResendOTP {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    error: any;
    message: string | null;
}

const initialState: ResendOTP = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    error: null,
    message: null,
};

export const Resend_Otp = createAsyncThunk(
    "Resend_Otp",
    async ({ email }: { email: string }, thunkAPI) => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({ email });

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}resend_otp`, {
                method: "PUT",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
            });

            if (!response.ok) {
                const errorMessage = await response.json();
                throw new Error(errorMessage.message || "Failed to resend OTP");
            }

            const data = await response.json();
            return data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || "An error occurred");
        }
    }
);

const resendOTP = createSlice({
    name: "resendOTP",
    initialState,
    reducers: {
        clear_resend_otp_state: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(Resend_Otp.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(Resend_Otp.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload;
            })
            .addCase(Resend_Otp.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload;
            });
    },
});

export const { clear_resend_otp_state } = resendOTP.actions;
export default resendOTP.reducer;
