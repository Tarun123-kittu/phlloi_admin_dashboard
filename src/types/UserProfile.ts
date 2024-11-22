export interface SexualOrientation {
    id: string;
    value: string;
}

export interface RelationshipTypePreference {
    id: string;
    value: string;
}

export interface Image {
    url: string;
    position: number;
    _id: string;
}

export interface UserCharacteristicsStep {
    questionText: string;
    answerText: string | null;
    answerTexts: string[];
}

export interface UserCharacteristics {
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
