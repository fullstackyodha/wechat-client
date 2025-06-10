import { configureStore } from "@reduxjs/toolkit";
import usersReducers from "@/redux_toolkit/reducers/users.reducers";
import suggestionsReducers from "@/redux_toolkit/reducers/suggestions/suggestions.reducers";
import notificationsReducer from "@/redux_toolkit/reducers/notifications/notifications.reducers";

export const store = configureStore({
    reducer: {
        user: usersReducers,
        sugesstions: suggestionsReducers,
        notifications: notificationsReducer
    }
});
