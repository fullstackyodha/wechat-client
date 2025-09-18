import { fireEvent, render, screen } from "@/services/utils/test-utils.jsx";
import Button from "./Button.jsx";
import { vi } from "vitest";

describe("Button", () => {
    it("should be disabled", () => {
        render(<Button label="Send" disabled={true} className="button" />);

        const buttonElement = screen.getByRole("button");

        expect(buttonElement).toBeDisabled();
    });

    it("should be enabled", () => {
        render(<Button label="Send" disabled={false} className="button" />);

        const buttonElement = screen.getByRole("button");

        expect(buttonElement).toBeEnabled();
    });

    it("should have label", () => {
        render(<Button label="Send" className="button" />);

        const buttonText = screen.getByText(/send/i);

        expect(buttonText).toBeInTheDocument();
    });

    it("should handle click", () => {
        const onClick = vi.fn();

        render(
            <Button
                label="Send"
                className="button"
                disabled={false}
                handleClick={onClick}
            />
        );

        const buttonElement = screen.getByRole("button");
        fireEvent.click(buttonElement);

        expect(onClick).toHaveBeenCalledTimes(1);
    });
});
