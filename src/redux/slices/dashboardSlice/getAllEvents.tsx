import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_CONFIG } from "../../../../src/config/app_config";

interface RoomsState {
    type: string,
    message: string,
    data: number
}

interface InitialStateTypes {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    error: string | null;
    data: RoomsState | null;
}

const initialState: InitialStateTypes = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    data: null,
    error: null,
};

export const get_all_events_count = createAsyncThunk<
    RoomsState,
    void,
    { rejectValue: string }
>("gat_all_dashboard_events", async (_, { rejectWithValue }) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('phloii_token'));

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow" as RequestRedirect,
        };

        const response = await fetch(
            `${API_CONFIG.BASE_URL}get_all_events_count`,
            requestOptions
        );

        if (!response.ok) {
            return rejectWithValue("Failed to fetch events");
        }

        const result = await response.json();
        return result.data;
    } catch (error) {
        return rejectWithValue("An error occurred while fetching events");
    }
});

const GetAllDashboardEvents = createSlice({
    name: "GetAllDashboardEvents",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(get_all_events_count.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
                state.error = null;
            })
            .addCase(get_all_events_count.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.data = action.payload;
            })
            .addCase(get_all_events_count.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload || "An unexpected error occurred";
            });
    },
});

export default GetAllDashboardEvents.reducer;
