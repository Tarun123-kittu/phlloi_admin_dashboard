import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice/userListSlice"
import ChangePassword from "./slices/authSlice/changePassword"
import forgot_password_state from "./slices/authSlice/forgotPasswordSlice"
import verifyOtpSlice from "./slices/authSlice/verifyOtpSlice"
import resendOTP from "./slices/authSlice/resendOtpSlice"
import resetPasswordState from "./slices/authSlice/resetPasswordSlice"
import userVerificationListSlice from "./slices/userVerificationSlice/getAllVerificationRequests"
import userDetailSlice from "./slices/userSlice/getUserDetails"
import VerifyUserState from "./slices/userVerificationSlice/verifyUser"
import addSectionAPI from "./slices/pagesSlice/addSectionSlice"
import getAllSectionsAPI from "./slices/pagesSlice/getAllSectionsSlice"
import getSectionByIdAPI from "./slices/pagesSlice/getSectionByIdSlice"
import deletePageAPI from "./slices/pagesSlice/deletePageSlice"
import deleteSectionAPI from "./slices/pagesSlice/deleteSectionSlice"
import updatePageAPI from "./slices/pagesSlice/updatePageSlice"

export const store = configureStore({
  reducer: {
    USERLIST: userSlice,
    CHANGE_PASSWORD: ChangePassword,
    FORGOT_PASSWORD: forgot_password_state,
    VERIFY_OTP: verifyOtpSlice,
    RESEND_OTP: resendOTP,
    RESET_PASSWORD: resetPasswordState,
    VERIFICATION_LIST: userVerificationListSlice,
    USER_DATAILS: userDetailSlice,
    VERIFY_USER: VerifyUserState,
    ADD_SECTION: addSectionAPI,
    ALL_SECTIONS: getAllSectionsAPI,
    SECTION_DETAILS: getSectionByIdAPI,
    DELETE_PAGE : deletePageAPI,
    DELETE_SECTION : deleteSectionAPI,
    UPDATE_PAGE : updatePageAPI
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;