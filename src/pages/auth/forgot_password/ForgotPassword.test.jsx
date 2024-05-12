import React from "react";
import { forgotPasswordMock, forgotPasswordMockError } from "@/mocks/handlers/auth.js";
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
import ForgotPassword from "./ForgotPassword.jsx";

describe("ForgotPassword", () => {
    it("Form should have email label", () => {
        render(<ForgotPassword />);

        const emailLabel = screen.getByLabelText("Email");

        expect(emailLabel).toBeInTheDocument();
    });

    it("Should have Login text", () => {
        render(<ForgotPassword />);

        const spanElement = screen.getByText("Login");

        expect(spanElement).toBeInTheDocument();
    });

    describe("Button", () => {
        it("Button should be disabled", () => {
            render(<ForgotPassword />);

            const buttonElement = screen.getByRole("button");

            expect(buttonElement).toBeDisabled();
        });

        it("Should be enabled with input", () => {
            render(<ForgotPassword />);

            const buttonElement = screen.getByRole("button");

            expect(buttonElement).toBeDisabled();

            const emailElement = screen.getByLabelText("Email");

            fireEvent.change(emailElement, { target: { value: "harshal31@gmail.com" } });

            expect(buttonElement).toBeEnabled();
        });

        it("Should change label when clicked", async () => {
            render(<ForgotPassword />);

            const buttonElement = screen.getByRole("button");
            const emailElement = screen.getByLabelText("Email");

            fireEvent.change(emailElement, { target: { value: "harshal31@gmail.com" } });

            fireEvent.click(buttonElement);

            const newButtonElement = screen.getByRole("button");

            expect(newButtonElement.textContent).toEqual("UPDATING PASSWORD...");

            await waitFor(() => {
                const newButtonElement1 = screen.getByRole("button");
                expect(newButtonElement1.textContent).toEqual("UPDATE PASSWORD");
            });
        });
    });

    describe("Success", () => {
        it("Should display success alert", async () => {
            server.use(forgotPasswordMock);

            render(<ForgotPassword />);

            const buttonElement = screen.getByRole("button");
            const emailElement = screen.getByLabelText("Email");

            fireEvent.change(emailElement, { target: { value: "harshal31@gmail.com" } });

            fireEvent.click(buttonElement);

            await waitFor(() => {
                expect(screen.getByRole("alert")).toBeInTheDocument();

                expect(screen.getByRole("alert")).toHaveClass("alert-success");

                expect(screen.getByRole("alert").textContent).toEqual(
                    "Password reset email sent."
                );
            });

            const alert = await screen.findByRole("alert");
            expect(alert).toBeInTheDocument();
        });
    });

    describe("Error", () => {
        it("Should display error alert and border", async () => {
            server.use(forgotPasswordMockError);

            render(<ForgotPassword />);

            const buttonElement = screen.getByRole("button");
            const emailElement = screen.getByLabelText("Email");

            fireEvent.change(emailElement, { target: { value: "harshal31@gmail.com" } });

            fireEvent.click(buttonElement);

            await waitFor(() => {
                expect(emailElement).toHaveStyle({
                    border: "1px solid #fa9b8a"
                });

                expect(screen.getByRole("alert")).toHaveClass("alert-error");
                expect(screen.getByRole("alert").textContent).toEqual(
                    "Invalid Credentials"
                );
            });

            const alert = await screen.findByRole("alert");
            expect(alert).toBeInTheDocument();
        });
    });
});
