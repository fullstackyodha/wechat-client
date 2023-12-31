import { createSlice } from "@reduxjs/toolkit";

const initialState = { token: "", profile: null };

// generates action creators and action types that correspond to the reducers and state.
const userSlice = createSlice({
    name: "User",
    initialState,
    reducers: {
        addUser: (state, action) => {
            const { token, profile } = action.payload;
            state.token = token;
            state.profile = profile;
        },
        updateUserProfile: (state, action) => {
            state.profile = action.payload;
        },
        clearUser: (state, action) => {
            state.token = "";
            state.profile = null;
        }
    }
});

// ACTION
export const { addUser, updateUserProfile, clearUser } = userSlice.actions;
// REDUCERS
export default userSlice.reducer;
