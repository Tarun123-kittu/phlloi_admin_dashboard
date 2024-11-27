import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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

export const delete_page = createAsyncThunk("delete_page", async ({ id }: { id: string }, thunkAPI) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('phloii_token'));

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}delete_page?pageId=${id}`, {
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

const deletePageAPI = createSlice({
    name: "deletePageAPI",
    initialState,
    reducers: {
        clear_deletePage_state: () => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(delete_page.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(delete_page.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true
                state.message = action.payload;
            })
            .addCase(delete_page.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
                state.isError = true
            });
    }
})

export const { clear_deletePage_state } = deletePageAPI.actions;
export default deletePageAPI.reducer;