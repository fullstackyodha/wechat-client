import { createSlice } from "@reduxjs/toolkit";

const initialState = { users: [], isLaoding: false };

const suggestionsSlice = createSlice({
    name: "Suggestions",
    initialState,
    reducers: {
        addToSuggestions: (state, action) => {
            const { isLoading, users } = action.payload;

            state.users = [...users];
            state.isLaoding = isLoading;
        }
    }
});

export const { addToSuggestions } = suggestionsSlice.actions;
export default suggestionsSlice.reducer;
