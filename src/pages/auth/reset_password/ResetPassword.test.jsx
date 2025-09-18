import { resetPasswordMock, resetPasswordMockError } from "@/mocks/handlers/auth.js";
import { server } from "@/mocks/server";
import ResetPassword from "./ResetPassword.jsx";
import { fireEvent, render, screen, waitFor } from "@/services/utils/test-utils.jsx";
import { Route, createBrowserRouter, createSearchParams } from "react-router-dom";

describe("ResetPassword", () => {
    beforeEach(() => {
        const url = `/reset-password?${createSearchParams({
            token: "1234567890"
        })}`;

        const router = createBrowserRouter([{ path: "/", element: <ResetPassword /> }]);

        router.navigate(url);
    });

    it("Should have password inputs", () => {
        render(<ResetPassword />);

        const newPasswordLabel = screen.getByLabelText("New Password");
        const confirmPasswordLabel = screen.getByLabelText("Confirm Password");

        expect(newPasswordLabel).toBeInTheDocument();
        expect(confirmPasswordLabel).toBeInTheDocument();
    });

    it("Button should be disabled", () => {
        render(<ResetPassword />);

        const buttonElement = screen.getByRole("button");
        expect(buttonElement).toBeDisabled();
    });

    it("Should have Login text", () => {
        render(<ResetPassword />);

        const spanElement = screen.getByText("Login");
        expect(spanElement).toBeInTheDocument();
    });

    it("Should be enabled with input", () => {
        render(<ResetPassword />);

        const buttonElement = screen.getByRole("button");
        expect(buttonElement).toBeDisabled();

        const newPasswordLabel = screen.getByLabelText("New Password");
        const confirmPasswordLabel = screen.getByLabelText("Confirm Password");

        fireEvent.change(newPasswordLabel, { target: { value: "qwerty1" } });
        fireEvent.change(confirmPasswordLabel, { target: { value: "qwerty1" } });

        expect(buttonElement).toBeEnabled();
    });

    it("Should change label when clicked", async () => {
        render(<ResetPassword />);

        const buttonElement = screen.getByRole("button");
        const newPasswordLabel = screen.getByLabelText("New Password");
        const confirmPasswordLabel = screen.getByLabelText("Confirm Password");

        fireEvent.change(newPasswordLabel, { target: { value: "qwerty1" } });
        fireEvent.change(confirmPasswordLabel, { target: { value: "qwerty1" } });

        fireEvent.click(buttonElement);

        const newButtonElement = screen.getByRole("button");
        expect(newButtonElement.textContent).toEqual("RESETING PASSWORD...");

        await waitFor(() => {
            const newButtonElement1 = screen.getByRole("button");
            expect(newButtonElement1.textContent).toEqual("RESET PASSWORD");
        });
    });

    describe("Success", () => {
        it("Should display success alert", async () => {
            server.use(resetPasswordMock);

            render(<ResetPassword />);

            const buttonElement = screen.getByRole("button");
            const newPasswordLabel = screen.getByLabelText("New Password");
            const confirmPasswordLabel = screen.getByLabelText("Confirm Password");

            fireEvent.change(newPasswordLabel, { target: { value: "qwerty1" } });
            fireEvent.change(confirmPasswordLabel, { target: { value: "qwerty1" } });

            fireEvent.click(buttonElement);

            await waitFor(() => {
                expect(screen.getByRole("alert")).toHaveClass("alert-success");
                expect(screen.getByRole("alert").textContent).toEqual(
                    "Password successfully updated."
                );
            });

            const alert = await screen.findByRole("alert");
            expect(alert).toBeInTheDocument();
        });
    });

    describe("Error", () => {
        it("Should display error alert and border", async () => {
            server.use(resetPasswordMockError);

            render(<ResetPassword />);

            const buttonElement = screen.getByRole("button");
            const newPasswordLabel = screen.getByLabelText("New Password");
            const confirmPasswordLabel = screen.getByLabelText("Confirm Password");

            fireEvent.change(newPasswordLabel, { target: { value: "qwerty1" } });
            fireEvent.change(confirmPasswordLabel, { target: { value: "qwerty1" } });

            fireEvent.click(buttonElement);

            await waitFor(() => {
                expect(screen.getByRole("alert")).toHaveClass("alert-error");

                expect(screen.getByRole("alert").textContent).toEqual(
                    "Reset Token has expired!!!"
                );

                expect(newPasswordLabel).toHaveStyle({ border: "1px solid #fa9b8a" });
                expect(confirmPasswordLabel).toHaveStyle({ border: "1px solid #fa9b8a" });
            });

            const alert = await screen.findByRole("alert");
            expect(alert).toBeInTheDocument();
        });
    });
});
