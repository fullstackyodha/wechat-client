import { fireEvent, render, screen, within } from "@/services/utils/test-utils.jsx";
import AuthTabs from "./AuthTabs.jsx";

describe("Authtabs", () => {
    it("Sign In tab should be displayed", () => {
        render(<AuthTabs />);

        const listElement = screen.getByRole("list");
        expect(listElement).toBeInTheDocument();

        const button = screen.getAllByRole("button");
        fireEvent.click(button[0]);

        const { getAllByRole } = within(listElement);

        const items = getAllByRole("listitem");

        expect(items[0]).toHaveTextContent("Sign In");
        expect(items[0]).toHaveClass("false");
    });

    it("Sign Up tab should be displayed", () => {
        render(<AuthTabs />);

        const listElement = screen.getByRole("list");
        expect(listElement).toBeInTheDocument();

        const button = screen.getAllByRole("button");
        fireEvent.click(button[1]);

        const { getAllByRole } = within(listElement);

        const items = getAllByRole("listitem");

        expect(items[1]).toHaveTextContent("Sign Up");
        expect(items[1]).toHaveClass("false");
    });
});
