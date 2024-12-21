import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Interface for Address data
interface AddressType {
    country: string;
    pinCode: number;
    state: string;
}

// Interface for a single hotel request
interface HotelRequest {
    _id: string;
    establishmentName: string;
    establishmentType: string;
    address: AddressType;
    createdAt: string;
    paymentStatus?: string; // Optional field, if it exists
}

// Interface for the paginated API response
interface PaginatedHotelResponse {
    currentPage: number;
    totalPages: number;
    totalRequests: number;
    requests: HotelRequest[]; // List of hotel requests
}

// Interface for the full response data from the API
interface APIResponse {
    data: PaginatedHotelResponse;
    error: string | null; // Error message if any
}

// Redux state for handling hotel verification
interface HotelState {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    error: string | null;
    hotels: PaginatedHotelResponse | null; // The paginated hotel data
}

// Initial state for the Redux slice
const initialState: HotelState = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    error: null,
    hotels: null,
};


export const get_all_hotel_verification_requests = createAsyncThunk(
    "hotel/get_all_hotel_verification_requests",
    async ({ showVerifiedHotel, page }: { showVerifiedHotel: boolean, page: number }, thunkAPI) => { // Accepting object with the showVerifiedHotel and page fields
        try {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + localStorage.getItem('phloii_token'));

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}get_hotel_verification_requests?showVerifiedHotel=${showVerifiedHotel}&page=${page}`,
                {
                    method: "GET",
                    headers: myHeaders,
                    redirect: "follow",
                }
            );

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

const hotelSlice = createSlice({
    name: "hotelSlice",
    initialState,
    reducers: {
        clear_hotel_varification_details_state: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_all_hotel_verification_requests.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(get_all_hotel_verification_requests.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.hotels = action.payload;
            })
            .addCase(get_all_hotel_verification_requests.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message || "An error occurred";
            })
    }
})

export const { clear_hotel_varification_details_state } = hotelSlice.actions;
export default hotelSlice.reducer;