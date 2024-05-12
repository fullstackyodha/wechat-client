import { store } from "@/redux_toolkit/store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { cleanup, render } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(() => {
    // Unmounts React trees that were mounted with render.
    cleanup();
});

function customRender(ui, options = {}) {
    return render(ui, {
        // wrap provider(s) here if needed
        wrapper: ({ children }) => (
            <Provider store={store}>
                <MemoryRouter>{children}</MemoryRouter>
            </Provider>
        ),
        ...options
    });
}

export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";
// override render export
export { customRender as render };
