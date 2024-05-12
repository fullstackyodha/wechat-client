import { HttpResponse, http } from "msw";
import { existingUser, userJwt } from "../data/user.mock";

const BASE_URL = `${import.meta.env.VITE_REACT_APP_BASE_ENDPOINT}/api/v1`;

export const signUpMock = http.post(`${BASE_URL}/signup`, async ({}) => {
    const result = {
        message: "User created Successfully!!!",
        data: { newUser: existingUser, token: userJwt }
    };

    return HttpResponse.json(result, { status: 200 });
});

export const signUpErrorMock = http.post(`${BASE_URL}/signup`, async ({}) => {
    const result = {
        message: "Invalid Credentials"
    };

    return HttpResponse.json(result, { status: 400 });
});

export const signInMock = http.post(`${BASE_URL}/signin`, async ({}) => {
    const result = {
        message: "User Logged In Successfully!!!",
        data: { user: existingUser, token: userJwt }
    };

    return HttpResponse.json(result, { status: 200 });
});

export const signInMockError = http.post(`${BASE_URL}/signin`, async () => {
    const result = {
        message: "Invalid Credentials"
    };

    return HttpResponse.json(result, { status: 400 });
});

export const forgotPasswordMock = http.post(`${BASE_URL}/forgot-password`, async () => {
    const result = {
        message: "Password reset email sent."
    };

    return HttpResponse.json(result, { status: 200 });
});

export const forgotPasswordMockError = http.post(
    `${BASE_URL}/forgot-password`,
    async () => {
        const result = {
            message: "Invalid Credentials"
        };

        return HttpResponse.json(result, { status: 400 });
    }
);

export const resetPasswordMock = http.post(
    `${BASE_URL}/reset-password/:token`,
    async () => {
        const result = {
            message: "Password successfully updated."
        };

        return HttpResponse.json(result, { status: 200 });
    }
);

export const resetPasswordMockError = http.post(
    `${BASE_URL}/reset-password/:token`,
    async () => {
        const result = {
            message: "Reset Token has expired!!!"
        };

        return HttpResponse.json(result, { status: 400 });
    }
);

export const authHandlers = [
    signUpMock,
    signUpErrorMock,
    signInMock,
    signInMockError,
    forgotPasswordMock,
    forgotPasswordMockError
];
