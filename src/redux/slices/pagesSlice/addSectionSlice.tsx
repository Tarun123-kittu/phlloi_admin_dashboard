import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface pagesInterface {
    title: string;
    content: string | null;
    slug: string;
}

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

export const add_section = createAsyncThunk("add_section", async ({ section, pages }: { section: string, pages: pagesInterface[] }, thunkAPI) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('phloii_token'));

        const raw = JSON.stringify({
            "section": section,
            "pages": pages
        });

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}add_section`, {
            method: "POST",
            headers: myHeaders,
            body: raw,
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

const addSectionAPI = createSlice({
    name: "addSectionAPI",
    initialState,
    reducers: {
        clear_add_section_state: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(add_section.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(add_section.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true
                state.message = action.payload;
            })
            .addCase(add_section.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
                state.isError = true
            });
    }
})

export const { clear_add_section_state } = addSectionAPI.actions;
export default addSectionAPI.reducer;