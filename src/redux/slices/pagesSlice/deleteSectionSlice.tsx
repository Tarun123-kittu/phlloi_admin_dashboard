import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_CONFIG } from "@/config/app_config";

export interface sectionState {
    isLoading: boolean;
    error: string | null;
    isSuccess: boolean;
    isError: boolean;
    message: string | null
}

const initialState: sectionState = {
    isLoading: false,
    error: null,
    isSuccess: false,
    isError: false,
    message: null,
};

export const delete_section = createAsyncThunk("delete_section", async ({ id }: { id: string }, thunkAPI) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('phloii_token'));

        const response = await fetch(`${API_CONFIG.BASE_URL}delete_section?sectionId=${id}`, {
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
            return data.message;
        } else {
            throw new Error(data.message || "Request failed");
        }
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message || "An error occurred");
    }
})

const deleteSectionAPI = createSlice({
    name: "deletePageAPI",
    initialState,
    reducers: {
        clear_deleteSection_state: () => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(delete_section.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(delete_section.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true
                state.message = action.payload;
            })
            .addCase(delete_section.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
                state.isError = true
            });
    }
})

export const { clear_deleteSection_state } = deleteSectionAPI.actions;
export default deleteSectionAPI.reducer;