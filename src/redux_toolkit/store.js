import { configureStore } from "@reduxjs/toolkit";
import usersReducers from "@/redux_toolkit/reducers/users.reducers";
import suggestionsReducers from "@/redux_toolkit/reducers/suggestions/suggestions.reducers";

export const store = configureStore({
    reducer: { user: usersReducers, sugesstions: suggestionsReducers }
});
