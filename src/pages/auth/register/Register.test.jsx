import React from "react";
import { describe, it, expect, vi } from "vitest";
import {
    act,
    fireEvent,
    prettyDOM,
    render,
    screen,
    waitFor
} from "@/services/utils/test-utils.jsx";
import Register from "./Register.jsx";
import { Utils } from "@/services/utils/utils.service.js";
import { authService } from "@/services/api/auth/auth.service.js";
import { server } from "@/mocks/server.js";
import { signUpErrorMock } from "@/mocks/handlers/auth.js";

const mockedUseNavigate = vi.fn();

vi.mock("react-router-dom", () => ({
    // Imports a module with all of its properties and nested properties mocked.
    ...vi.importMock("react-router-dom"),
    useNavigate: () => mockedUseNavigate,
    MemoryRouter: ({ children }) => children
}));

describe("Register", () => {
    describe("Labels", () => {
        it("Should render the username email, password & labels", () => {
            render(<Register />);

            const usernameLabel = screen.getByLabelText("Username");
            const emailLabel = screen.getByLabelText("Email");
            const passwordLabel = screen.getByLabelText("Password");

            // Assert whether an element is present in the document or not.
            expect(usernameLabel).toBeInTheDocument();
            expect(emailLabel).toBeInTheDocument();
            expect(passwordLabel).toBeInTheDocument();
        });
    });

    describe("Register Button", () => {
        it("Should be disabled", () => {
            render(<Register />);

            const buttonElement = screen.getByRole("button");

            // Allows you to check whether an element is disabled from the user's perspective.
            expect(buttonElement).toBeDisabled();
        });

        it("Label should change to Registering... when input values are set and clicked", async () => {
            // SPYING ON THE GENERATE AVATAR IMAGE FUNCTION
            // Accepts a value that will be returned whenever the mock function is called.
            vi.spyOn(Utils, "generateAvatarImage").mockReturnValue("avatar image");

            // Verifies with the mocked server whether the api end point exists
            // vi.spyOn(authService, "signUp").mockReturnValue({});

            render(<Register />);

            // Accessing the elements
            const buttonElement = screen.getByRole("button");
            const usernameInput = screen.getByRole("textbox", { name: "Username" });
            const emailInput = screen.getByRole("textbox", { name: "Email" });
            const passwordInput = screen.getByLabelText("Password");

            // Simulate typing into the password input
            fireEvent.change(usernameInput, { target: { value: "harshal" } });
            fireEvent.change(emailInput, { target: { value: "harshal31@gmail.com" } });
            fireEvent.change(passwordInput, { target: { value: "Qwerty31" } });

            // Clicking the Enabled Register Button
            // Wrap any code rendering and triggering updates into act() calls.
            act(() => {
                fireEvent.click(buttonElement);
            });

            // Signup is an async function so need to wait for it to finish
            await waitFor(() => {
                const clickedbuttonElement = screen.getByRole("button");

                return expect(clickedbuttonElement.textContent).toEqual("REGISTERING...");
            });
        });
    });

    describe("On Success", () => {
        it("Should navigate to Streams Page", async () => {
            vi.spyOn(Utils, "generateAvatarImage").mockReturnValue("avatar image");
            // vi.spyOn(authService, "signUp").mockReturnValue({});

            render(<Register />);

            // Accessing the elements
            const buttonElement = screen.getByRole("button");
            const usernameInput = screen.getByRole("textbox", { name: "Username" });
            const emailInput = screen.getByRole("textbox", { name: "Email" });
            const passwordInput = screen.getByLabelText("Password");

            fireEvent.change(usernameInput, { target: { value: "harshal" } });
            fireEvent.change(emailInput, { target: { value: "harshal31@gmail.com" } });
            fireEvent.change(passwordInput, { target: { value: "Qwerty31" } });

            // No need of act()
            fireEvent.click(buttonElement);

            await waitFor(() =>
                // Check if useNavigate fun is called with parameters /app/social/streams or not
                expect(mockedUseNavigate).toHaveBeenCalledWith("/app/social/streams")
            );
        });
    });

    describe("On Error", () => {
        it("Should display error alert on input elements", async () => {
            // ***** EXPLICITLY making use of signUpErrorMock for this test case *****
            server.use(signUpErrorMock);

            vi.spyOn(Utils, "generateAvatarImage").mockReturnValue("avatar image");

            render(<Register />);

            // Accessing the elements
            const buttonElement = screen.getByRole("button");
            const usernameInput = screen.getByRole("textbox", { name: "Username" });
            const emailInput = screen.getByRole("textbox", { name: "Email" });
            const passwordInput = screen.getByLabelText("Password");

            fireEvent.change(usernameInput, { target: { value: "harshal" } });
            fireEvent.change(emailInput, { target: { value: "harshal31@gmail.com" } });
            fireEvent.change(passwordInput, { target: { value: "Qwerty31" } });

            // No need of act()
            fireEvent.click(buttonElement);

            const alert = await screen.findByRole("alert");
            // console.log(prettyDOM(alert));

            expect(alert).toBeInTheDocument();
            expect(alert.textContent).toEqual("Invalid Credentials");

            await waitFor(() => {
                expect(alert).toHaveStyle("border: 1px solid var(--error)");
                expect(usernameInput).toHaveStyle("border: 1px solid #fa9b8a");
                expect(emailInput).toHaveStyle("border: 1px solid #fa9b8a");
                expect(passwordInput).toHaveStyle("border: 1px solid #fa9b8a");
            });
        });
    });
});
