import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_CONFIG } from "../../../../src/config/app_config";

export interface VerifyUserState {
    isLoading: boolean;
    error: string | null;
    isSuccess: boolean;
    isError: boolean;
    message: string | null;
}

const initialState: VerifyUserState = {
    isLoading: false,
    error: null,
    isSuccess: false,
    isError: false,
    message: null,
};

interface VerifyHotelPayload {
    hotelId: string;
    verificationStatus: boolean;
    rejectionReason? : string
}

export const verify_hotel = createAsyncThunk<
    string, // Success payload type
    VerifyHotelPayload, // Argument type
    { rejectValue: string } // Rejected value type
>("hotel/verify_hotel", async ({ hotelId, verificationStatus, rejectionReason }, thunkAPI) => {
    try {
        const myHeaders = new Headers();
        const token = localStorage.getItem("phloii_token");
        if (!token) {
            throw new Error("Authorization token is missing");
        }
        myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            hotelId,
            requestResponse: verificationStatus,
            rejectionReason : rejectionReason
        });

        const apiUrl = API_CONFIG.BASE_URL;
        if (!apiUrl) {
            throw new Error("API URL is not defined in environment variables");
        }

        const response = await fetch(`${apiUrl}accept_reject_hotel_verification`, {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        });

        if (!response.ok) {
            const errorMessage = await response.json().catch(() => ({
                message: "An unknown error occurred",
            }));
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
});

const verifyHotelState = createSlice({
    name: "verifyHotelState",
    initialState,
    reducers: {
        clearVerifyHotelState: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(verify_hotel.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
                state.error = null;
            })
            .addCase(verify_hotel.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload;
                state.error = null;
            })
            .addCase(verify_hotel.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload || "An error occurred";
            });
    },
});

export const { clearVerifyHotelState } = verifyHotelState.actions;

export default verifyHotelState.reducer;
