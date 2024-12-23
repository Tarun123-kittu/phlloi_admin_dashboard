import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { API_CONFIG } from "@/config/app_config";

interface PagesList {
    sectionId: string,
    _id: string;
    title: string;
    content: string;
    slug: string;
}

interface InitialStateTypes {
    isLoading: boolean;
    error: string | null;
    isSuccess: boolean;
    isError: boolean;
    message: string;
}

const initialState: InitialStateTypes = {
    isLoading: false,
    error: null,
    isSuccess: false,
    isError: false,
    message: "",
};

export const update_section = createAsyncThunk<
    string,
    { sectionId: string; section: string; pages: PagesList[] },
    { rejectValue: string }
>(
    "update_section",
    async ({ sectionId, section, pages }, { rejectWithValue }) => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", "Bearer " + localStorage.getItem("phloii_token"));

            const raw = JSON.stringify({
                sectionId,
                section,
                pages,
            });

            const response = await fetch(`${API_CONFIG.BASE_URL}update_section`, {
                method: "PUT",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
            });
            if (!response.ok) {
                const errorMessage = await response.json();
                throw new Error(errorMessage?.message || "Unknown error occurred");
            }

            const data = await response.json();
            if (data.type === "success") {
                return data.message as string;
            } else {
                throw new Error(data.message || "Request failed");
            }
        } catch (error) {
            return rejectWithValue((error as Error).message || "An error occurred");
        }
    }
);

const updatePageAPI = createSlice({
    name: "UpdateSectionAPI",
    initialState,
    reducers: {
        clear_update_section: () => initialState,
      },
    extraReducers: (builder) => {
        builder
            .addCase(update_section.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = null;
            })
            .addCase(update_section.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload;
            })
            .addCase(update_section.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload || "An error occurred";
            });
    },
})

export const { clear_update_section } = updatePageAPI.actions;
export default updatePageAPI.reducer;
