import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_CONFIG } from "../../../../src/config/app_config";

export interface ChangePasswordState {
    isLoading: boolean;
    error: string | null;
    isSuccess: boolean;
    isError: boolean;
    message: string | null;
}

const initialState: ChangePasswordState = {
    isLoading: false,
    error: null,
    isSuccess: false,
    isError: false,
    message: null,
};

export const Change_password = createAsyncThunk(
    "changePassword",
    async ( 
        { password, newPassword, confirmPassword }: { password: string; newPassword: string; confirmPassword: string },
        thunkAPI
    ) => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + localStorage.getItem("phloii_token"));
            myHeaders.append("Content-Type", "application/json")

            const raw = JSON.stringify({
                password : password,
                newPassword : newPassword,
                confirmPassword : confirmPassword,
            });

            const response = await fetch(`${API_CONFIG.BASE_URL}change_password`, {
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

const ChangePassword = createSlice({
    name: "ChangePassword",
    initialState,
    reducers: {
        clearChangePasswordState: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(Change_password.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
            })
            .addCase(Change_password.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload;
            })
            .addCase(Change_password.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload as string;
            });
    },
});

export const { clearChangePasswordState } = ChangePassword.actions;

export default ChangePassword.reducer;
