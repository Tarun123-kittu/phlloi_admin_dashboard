import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { API_CONFIG } from "@/config/app_config";

// Define the type for the API response
interface Address {
  streetAddress: string;
  country: string;
  state: string;
  pinCode: number;
}

interface OwnerDetails {
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
}

interface OpenCloseTimings {
  open: string;
  close: string;
}

interface HotelDetails {
  _id: string;
  hotelAccountId: string;
  establishmentName: string;
  establishmentType: string;
  address: Address;
  ownerDetails: OwnerDetails;
  why_want_phloi: string;
  uniqueFeatures: string;
  inPersonVisitAvailability: string;
  images: string[];
  onboardingCompleted: boolean;
  adminVerified: boolean;
  paymentStatus: string;
  customerServiceNumber: string;
  food: string[];
  atmosphere: string[];
  services: string[];
  openCloseTimings: OpenCloseTimings;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Define the initial state
interface HotelState {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  error: { message: string } | string | null; 
  selectedHotel: HotelDetails | null;
}

const initialState: HotelState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  error: null,
  selectedHotel: null,
};

// Async thunk for fetching hotel details
export const get_selected_hotel_details = createAsyncThunk(
  "get_selected_hotel_details",
  async (hotelId: string, thunkAPI) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + localStorage.getItem('phloii_token'));

      const requestOptions: RequestInit = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      const response = await fetch(`${API_CONFIG.BASE_URL}/get_hotel_details?hotelId=${hotelId}`, requestOptions);
      if (!response.ok) {
        throw new Error("Failed to fetch hotel details");
      }
      const result = await response.json();
      return result.message as HotelDetails;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "An error occurred");
    }
  }
);

// Redux slice
const getSelectedHotelDetailsSlice = createSlice({
  name: "getSelectedHotelDetailsSlice",
  initialState,
  reducers: {
    clear_selected_hotel_details: (state) => {
      state.selectedHotel = null;
      state.isError = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(get_selected_hotel_details.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
    })
    .addCase(get_selected_hotel_details.fulfilled, (state, action: PayloadAction<HotelDetails>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.selectedHotel = action.payload;
    })
    .addCase(get_selected_hotel_details.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message || "An error occurred";
    });
  },
});

export const { clear_selected_hotel_details } = getSelectedHotelDetailsSlice.actions;
export default getSelectedHotelDetailsSlice.reducer;
