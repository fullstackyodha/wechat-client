import { getUserSuggestions } from "@/redux_toolkit/api/suggestions";
import { createSlice } from "@reduxjs/toolkit";

const initialState = { users: [], isLoading: false };

const suggestionsSlice = createSlice({
    name: "Suggestions",
    initialState,
    reducers: {
        addToSuggestions: (state, action) => {
            const { isLoading, users } = action.payload;

            state.users = [...users];
            state.isLoading = isLoading;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUserSuggestions.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(getUserSuggestions.fulfilled, (state, action) => {
            const { users } = action?.payload;
            state.users = users && [...users];
            state.isLoading = false;
        });

        builder.addCase(getUserSuggestions.rejected, (state) => {
            state.isLoading = false;
        });
    }
});

export const { addToSuggestions } = suggestionsSlice.actions;
export default suggestionsSlice.reducer;
