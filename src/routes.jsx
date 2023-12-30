import { useRoutes } from "react-router-dom";

import { AuthTabs, ForgotPassword, ResetPassword } from "./pages/auth";

const AppRouter = () => {
    // Returns the element of the route that matched the current location
    const routes = useRoutes([
        {
            path: "/",
            element: <AuthTabs />
        },
        {
            path: "/forgot-password",
            element: <ForgotPassword />
        },
        {
            path: "/reset-password",
            element: <ResetPassword />
        }
    ]);

    return routes;
};

export default AppRouter;
