import React from "react";
import { signInMockError } from "@/mocks/handlers/auth.js";
import { server } from "@/mocks/server.js";
import { describe, it, expect, vi } from "vitest";
import {
    act,
    fireEvent,
    prettyDOM,
    render,
    screen,
    waitFor
} from "@/services/utils/test-utils.jsx";
import Login from "./Login.jsx";
import { authService } from "@/services/api/auth/auth.service.js";

const mockedUseNavigate = vi.fn();

vi.mock("react-router-dom", () => ({
    ...vi.importMock("react-router-dom"),
    useNavigate: () => mockedUseNavigate,
    MemoryRouter: ({ children }) => children,
    Link: vi.fn(({ children }) => children)
}));

describe("Sign In", () => {
    it("signin form should have its labels", () => {
        render(<Login />);

        const usernameLabel = screen.getByLabelText("Username");
        const passwordLabel = screen.getByLabelText("Password");
        const checkBoxLabel = screen.getByLabelText("Keep me logged in");

        expect(usernameLabel).toBeInTheDocument();
        expect(passwordLabel).toBeInTheDocument();
        expect(checkBoxLabel).toBeInTheDocument();
    });

    it("checkbox should be unchecked", () => {
        render(<Login />);

        const checkBoxElement = screen.getByLabelText(/Keep me logged in/i);

        expect(checkBoxElement).not.toBeChecked();
    });

    it("checkbox should be checked when clicked", () => {
        render(<Login />);

        const checkBoxElement = screen.getByLabelText("Keep me logged in");

        expect(checkBoxElement).not.toBeChecked();

        fireEvent.click(checkBoxElement);

        expect(checkBoxElement).toBeChecked();
    });

    describe("Button", () => {
        it("Should be disabled", () => {
            render(<Login />);

            const buttonElement = screen.getByRole("button");

            expect(buttonElement).toBeDisabled();
        });

        it("Should be enabled with inputs", () => {
            render(<Login />);

            const buttonElement = screen.getByRole("button");

            expect(buttonElement).toBeDisabled();

            const usernameElement = screen.getByLabelText("Username");
            const passwordElement = screen.getByLabelText("Password");

            fireEvent.change(usernameElement, { target: { value: "harshal" } });
            fireEvent.change(passwordElement, { target: { value: "Qwerty31" } });

            expect(buttonElement).toBeEnabled();
        });

        it("Should change label when clicked", async () => {
            render(<Login />);

            const buttonElement = screen.getByRole("button");
            const usernameElement = screen.getByLabelText("Username");
            const passwordElement = screen.getByLabelText("Password");

            fireEvent.change(usernameElement, { target: { value: "harshal" } });
            fireEvent.change(passwordElement, { target: { value: "Qwerty31" } });

            fireEvent.click(buttonElement);

            await waitFor(() => {
                const newButtonElement = screen.getByRole("button");
                expect(newButtonElement.textContent).toEqual("LOGGING IN...");
            });
        });
    });

    describe("On Success", () => {
        it("Should navigate to Streams Page", async () => {
            vi.spyOn(authService, "signUp").mockReturnValue({});

            render(<Login />);

            const buttonElement = screen.getByRole("button");
            const usernameInput = screen.getByRole("textbox", { name: "Username" });
            const passwordInput = screen.getByLabelText("Password");

            fireEvent.change(usernameInput, { target: { value: "harshal" } });
            fireEvent.change(passwordInput, { target: { value: "Qwerty31" } });

            console.log(prettyDOM(usernameInput));
            console.log(prettyDOM(passwordInput));

            fireEvent.click(buttonElement);

            await waitFor(() =>
                expect(mockedUseNavigate).toHaveBeenCalledWith("/app/social/streams")
            );
        });
    });

    describe("Error", () => {
        it("should display error alert and border", async () => {
            server.use(signInMockError);

            render(<Login />);

            const buttonElement = screen.getByRole("button");
            const usernameElement = screen.getByLabelText("Username");
            const passwordElement = screen.getByLabelText("Password");

            fireEvent.change(usernameElement, { target: { value: "harshal" } });
            fireEvent.change(passwordElement, { target: { value: "Qwerty31" } });

            fireEvent.click(buttonElement);

            const alert = await screen.findByRole("alert");

            expect(alert).toBeInTheDocument();
            expect(alert.textContent).toEqual("Invalid Credentials");

            await waitFor(() => {
                expect(usernameElement).toHaveStyle({ border: "1px solid #fa9b8a" });
                expect(passwordElement).toHaveStyle({ border: "1px solid #fa9b8a" });
            });
        });
    });
});
