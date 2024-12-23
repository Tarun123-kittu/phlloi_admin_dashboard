import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { API_CONFIG } from "@/config/app_config";

interface PagesList {
  _id: string;
  title: string;
  content: string;
  slug: string;
}

interface Pages {
  _id: string;
  section: string;
  createdAt: string;
  pages: PagesList[];
}

interface InitialStateTypes {
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
  isError: boolean;
  data: Pages[];
}

const initialState: InitialStateTypes = {
  isLoading: false,
  error: null,
  isSuccess: false,
  isError: false,
  data: [],
};

export const get_all_sections = createAsyncThunk<
  Pages[], 
  void, 
  {
    rejectValue: string; 
  }
>("get_all_sections", async (_, { rejectWithValue }) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("phloii_token"));

    const response = await fetch(`${API_CONFIG.BASE_URL}get_sections`, {
      method: "GET",
      headers: myHeaders,
      redirect: "follow" as RequestRedirect,
    });

    if (!response.ok) {
      const errorMessage = await response.json();
      if (errorMessage?.message) {
        throw new Error(errorMessage.message);
      }
      throw new Error("Unknown error occurred");
    }

    const data = await response.json();
    if (data.type === "success") {
      return data.data as Pages[];
    } else {
      throw new Error(data.message || "Request failed");
    }
  } catch (error) {
    return rejectWithValue((error as Error).message || "An error occurred");
  }
});

const getAllSectionsAPI = createSlice({
  name: "getAllSectionsAPI",
  initialState,
  reducers: {
    clear_add_section_state: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(get_all_sections.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(get_all_sections.fulfilled, (state, action: PayloadAction<Pages[]>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
      })
      .addCase(get_all_sections.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload || "An error occurred";
      });
  },
});

export const { clear_add_section_state } = getAllSectionsAPI.actions;
export default getAllSectionsAPI.reducer;
