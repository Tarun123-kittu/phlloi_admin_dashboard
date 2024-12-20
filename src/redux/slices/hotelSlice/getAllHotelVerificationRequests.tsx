import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface AddressType {
    country: string;
}

interface ResponseType {
    _id: string;
    address: AddressType;
    establishmentName: string;
    establishmentType: string;
    paymentStatus: string;
    created_at: string;
}
interface Response {
    data: ResponseType
}

export interface HotelState {
    isLoading: boolean;
    error: string | null;
    isSuccess: boolean;
    isError: boolean;
    hotels: ResponseType[]
}

const initialState: HotelState = {
    isLoading: false,
    error: null,
    isSuccess: false,
    isError: false,
    hotels: []
}

export const get_all_hotel_verification_requests = createAsyncThunk("hotel/get_all_hotel_verification_requests", async (_, thunkAPI) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('phloii_token'));


        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}get_hotel_verification_requests`, {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        })

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
})

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