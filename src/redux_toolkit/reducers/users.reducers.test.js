import { beforeEach, expect } from "vitest";
import userReducer, { addUser, clearUser, updateUserProfile } from "./users.reducers";
import { existingUser, userJwt } from "@/mocks/data/user.mock";

const initialState = { token: "", profile: null };

describe("User Reducer", () => {
    beforeEach(() => {
        initialState.token = "";
        initialState.profile = null;
    });

    it("Should return initial State", () => {
        // State : undefined , action : {}
        expect(userReducer(undefined, {})).toEqual({
            token: "",
            profile: null
        });
    });

    it("Should add user with token & profile", () => {
        expect(
            userReducer(
                initialState, // State
                addUser({ token: userJwt, profile: { ...existingUser } }) // Action
            )
        ).toEqual({
            token: userJwt,
            profile: existingUser
        });
    });

    it("Should update user profile", () => {
        initialState.token = userJwt;
        initialState.profile = { username: "Harshal" };

        expect(
            userReducer(
                initialState, // State
                updateUserProfile({ username: "Harshal Solanki" }) // Action
            )
        ).toEqual({
            token: userJwt,
            profile: { username: "Harshal Solanki" }
        });
    });

    it("Should reset user profile & token", () => {
        initialState.token = userJwt;
        initialState.profile = { username: "Harshal" };

        expect(
            userReducer(
                initialState, // State
                clearUser() // Action
            )
        ).toEqual({
            token: "",
            profile: null
        });
    });
});
