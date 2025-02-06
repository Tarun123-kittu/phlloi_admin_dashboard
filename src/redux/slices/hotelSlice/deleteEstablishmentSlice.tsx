import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { API_CONFIG } from "../../../../src/config/app_config";

export interface UserProfile {
    type: string;
    message: string;
    data: any;
}

export interface UserState {
    isLoading: boolean;
    error: string | null;
    isSuccess: boolean;
    isError: boolean;
    data: UserProfile;
}

const initialState: UserState = {
    isLoading: false,
    error: null,
    isSuccess: false,
    isError: false,
    data: { type: "", message: "", data: null },
};

export const delete_establishment = createAsyncThunk(
    "delete_establishment",
    async ({ establishmentId }: { establishmentId: string }, thunkAPI) => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", "Bearer " + localStorage.getItem('phloii_token'));

            const response = await fetch(`${API_CONFIG.BASE_URL}delete_establishment?establishmentId=${establishmentId}`, {
                method: "DELETE",
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
    }
);

const DeleteEstablishment = createSlice({
    name: "DeleteEstablishment",
    initialState,
    reducers: {
        clear_deleted_establishment_state: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(delete_establishment.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
                state.error = null;
            })
            .addCase(
                delete_establishment.fulfilled,
                (state, action: PayloadAction<UserProfile>) => {
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.data = action.payload;
                }
            )
            .addCase(delete_establishment.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload as string;
            });
    },
});

export const { clear_deleted_establishment_state } = DeleteEstablishment.actions;
export default DeleteEstablishment.reducer;
