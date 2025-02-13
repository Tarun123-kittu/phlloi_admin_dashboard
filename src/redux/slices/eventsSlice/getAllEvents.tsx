import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_CONFIG } from "../../../../src/config/app_config";

interface HotelState {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    error: string | null;
    events: any;
}

const initialState: HotelState = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    error: null,
    events: null,
};

export const get_all_events = createAsyncThunk(
    "get_all_events",
    async (_, { rejectWithValue }) => {  
        try {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + localStorage.getItem("phloii_token"));

            const response = await fetch(`${API_CONFIG.BASE_URL}getEventsList`, {
                method: "GET",
                headers: myHeaders,
                redirect: "follow",
            });

            if (!response.ok) {
                const errorMessage = await response.json();
                throw new Error(errorMessage.message || "Failed to fetch events");
            }

            const data = await response.json();
            if (data.type === "success") {
                return data.data;
            } else {
                throw new Error(data.message || "Request failed");
            }
        } catch (error: any) {
            return rejectWithValue(error.message || "An error occurred");
        }
    }
);

const GetAllEvents = createSlice({
    name: "GetAllEvents",
    initialState,
    reducers: {
        clear_hotel_verification_details_state: () => initialState, 
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_all_events.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(get_all_events.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.events = action.payload;
            })
            .addCase(get_all_events.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload as string || "An error occurred"; 
            });
    },
});

export default GetAllEvents.reducer;
