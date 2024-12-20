import React from "react";
import { UserProfile } from "../../types/UserProfile";

const FormField = ({
    label,
    id,
    type = "text",
    value,
    placeholder,
}: {
    label: string;
    id: string;
    type?: string;
    value: string | undefined;
    placeholder?: string;
}) => (
    <div className="relative mb-2">
        <label htmlFor={id} className="block text-sm text-white dark:text-gray-300 mb-1">
            {label}
        </label>
        <input
            id={id}
            type={type}
            value={value || ""}
            placeholder={placeholder || ""}
            className="px-4 py-3 bg-black dark:bg-gray-700 text-white dark:text-white w-full text-sm  dark:border-gray-600 focus:border-[#007bff] outline-none"
            style={{ borderRadius: '10px' }}
            readOnly
        />

    </div>
);

const UserDetailsFormTwo = ({ userData }: { userData: UserProfile }) => {
    return (
        <div className="bg-cardBg dark:bg-gray-800 text-black dark:text-white p-6 rounded-lg shadow-lg mx-auto">
            <form className="font-poppins">
                <h2 className="text-xl text-white font-semibold mb-6">User Details</h2>

                <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
                    {/* First Column */}
                    <FormField
                        label="Relationship Type"
                        id="relationshipType"
                        value={userData?.relationship_type_preference_id?.value}
                        placeholder="Enter relationship type"
                    />

                    {/* Second Column */}
                    <FormField
                        label="Profile Verified"
                        id="profileVerified"
                        value={userData?.verified_profile ? "True" : "False"}
                        placeholder="Profile verified status"
                    />

                    {/* Sexual Orientation Preferences */}
                    {userData?.sexual_orientation_preference_id?.map((data, index) => (
                        <FormField
                            key={`sexualOrientation-${index}`}
                            label={`Sexual Orientation ${index + 1}`}
                            id={`sexualOrientation-${index}`}
                            value={data?.value}
                        />
                    ))}

                    {/* User Characteristics */}
                    {userData?.user_characterstics?.step_11?.map((data, index) => (
                        <FormField
                            key={`step11-${index}`}
                            
                            label={data?.questionText || `Characteristic ${index + 1}`}
                            id={`step11-${index}`}
                            value={
                                data?.answerText ||
                                data?.answerTexts?.join(", ") ||
                                "Not provided"
                            }
                        />
                    ))}

                    {userData?.user_characterstics?.step_12?.map((data, index) => (
                        <FormField
                            key={`step12-${index}`}
                            label={data?.questionText || `Characteristic ${index + 1}`}
                            id={`step12-${index}`}
                            value={
                                data?.answerText ||
                                data?.answerTexts?.join(", ") ||
                                "Not provided"
                            }
                        />
                    ))}

                    {userData?.user_characterstics?.step_13?.map((data, index) => (
                        <FormField
                            key={`step13-${index}`}
                            label={data?.questionText || `Characteristic ${index + 1}`}
                            id={`step13-${index}`}
                            value={
                                data?.answerText ||
                                data?.answerTexts?.join(", ") ||
                                "Not provided"
                            }
                        />
                    ))}

                    {/* Gender Display */}
                    <FormField
                        label="Show Gender"
                        id="showGender"
                        value={userData?.show_gender?.toString()}
                        placeholder="Gender display preference"
                    />
                </div>
            </form>
        </div>
    );
};

export default UserDetailsFormTwo;
