import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface SexualOrientation {
    id: string;
    value: string;
}

interface RelationshipTypePreference {
    id: string;
    value: string;
}

interface Image {
    url: string;
    position: number;
    _id: string;
}

interface UserCharacteristicsStep {
    questionText: string;
    answerText: string | null;
    answerTexts: string[];
}

interface UserCharacteristics {
    step_11: UserCharacteristicsStep[];
    step_12: UserCharacteristicsStep[];
    step_13: UserCharacteristicsStep[];
}

export interface UserProfile {
    _id: string;
    verified_profile: boolean;
    show_me_to_verified_profiles: boolean;
    username: string;
    mobile_number: number;
    email: string;
    dob: string;
    show_gender: boolean;
    intrested_to_see: string;
    online_status: boolean;
    sexual_orientation_preference_id: SexualOrientation[];
    distance_preference: number;
    user_characterstics: UserCharacteristics;
    subscription_type: string;
    images: Image[];
    gender: string;
    relationship_type_preference_id: RelationshipTypePreference;
    profile_verification_image: string;
}

export interface UserState {
    isLoading: boolean;
    error: string | null;
    isSuccess: boolean;
    isError: boolean;
    users: UserProfile
}

const initialState: UserState = {
    isLoading: false,
    error: null,
    isSuccess: false,
    isError: false,
    users: {} as UserProfile,
};

export const UserDetailsAPI = createAsyncThunk(
    "UserDetailsAPI",
    async ({ id }: { id: string }, thunkAPI) => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + localStorage.getItem('phloii_token'));
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}user_Details?userId=${id}`, {
                method: "GET",
                headers: myHeaders,
                redirect: "follow"
            });

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

const userDetailSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        clear_user_details_state: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(UserDetailsAPI.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(UserDetailsAPI.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = action.payload;
            })
            .addCase(UserDetailsAPI.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
                state.isError = true
            });
    },
});
export const { clear_user_details_state } = userDetailSlice.actions;
export default userDetailSlice.reducer;