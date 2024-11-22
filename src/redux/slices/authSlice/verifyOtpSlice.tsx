import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface VerifyOTP {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    error: any;
    message: string | null;
}

const initialState: VerifyOTP = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    error: null,
    message: null,
};

export const Verify_Otp = createAsyncThunk(
    "verifyOtp",
    async ({ otp, email }: { otp: string; email: string }, thunkAPI) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}forgetPassword_verifyOtp`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    otp : Number(otp),
                }),
            });

            if (!response.ok) {
                const errorMessage = await response.json();
                throw new Error(errorMessage.message || "Failed to verify OTP");
            }

            const data = await response.json();
            return data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || "An error occurred");
        }
    }
);

const verifyOtpSlice = createSlice({
    name: "verifyOtp",
    initialState,
    reducers: {
        clearVerifyOtpState: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(Verify_Otp.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = null;
            })
            .addCase(Verify_Otp.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload.message;
            })
            .addCase(Verify_Otp.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload;
            });
    },
});

export const { clearVerifyOtpState } = verifyOtpSlice.actions;
export default verifyOtpSlice.reducer;
