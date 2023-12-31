import { configureStore } from "@reduxjs/toolkit";
import usersReducers from "@/redux_toolkit/reducers/users.reducers";

export const store = configureStore({
    reducer: { users: usersReducers }
});
