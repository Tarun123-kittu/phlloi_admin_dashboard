import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface VerifyUserStateState {
    isLoading: boolean;
    error: string | null;
    isSuccess: boolean;
    isError: boolean;
    message: string | null;
}

const initialState: VerifyUserStateState = {
    isLoading: false,
    error: null,
    isSuccess: false,
    isError: false,
    message: null,
};

export const Verify_User_API = createAsyncThunk(
    "Verify_User_API",
    async (
        { userId, verificationStatus }: { userId: string; verificationStatus: boolean; },
        thunkAPI
    ) => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + localStorage.getItem("phloii_token"));
            myHeaders.append("Content-Type", "application/json")

            const raw = JSON.stringify({
                "userId": userId,
                "verificationStatus": verificationStatus
              });

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}approve_or_reject_verification`, {
                method: "PUT",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
            });

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
    }
);

const VerifyUserState = createSlice({
    name: "ChangePassword",
    initialState,
    reducers: {
        clearVerifyUserState: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(Verify_User_API.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
            })
            .addCase(Verify_User_API.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload;
            })
            .addCase(Verify_User_API.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload as string;
            });
    },
});

export const { clearVerifyUserState } = VerifyUserState.actions;

export default VerifyUserState.reducer;