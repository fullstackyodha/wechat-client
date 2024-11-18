import { useRoutes } from "react-router-dom";

import { AuthTabs, ForgotPassword, ResetPassword } from "@/pages/auth";
import Streams from "@/pages/social/streams/Streams";
import Social from "@/pages/social/Social";
import People from "@/pages/social/people/People";
import Chats from "@/pages/social/chats/Chats";
import Followings from "@/pages/social/followings/Followings";
import Followers from "@/pages/social/followers/Followers";
import Photos from "@/pages/social/photos/Photos";
import Notifications from "@/pages/social/notifications/Notifications";
import Profile from "@/pages/social/profile/Profile";
import ProtectedRoute from "./pages/ProtectedRoute";
import Error from "./pages/error/Error";
import { Suspense } from "react";
import StreamsSkeleton from "./pages/social/streams/StreamsSkeleton";

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
        },
        {
            path: "/app/social",
            element: (
                // WRAP WITH PROTECTED ROUTES COMPONENT
                <ProtectedRoute>
                    <Social />
                </ProtectedRoute>
            ),
            // Displayed in Outlet
            // NOTE: this is nested route no need to start with forward slash "/streams" in URL
            children: [
                {
                    path: "streams",
                    element: (
                        <Suspense fallback={<StreamsSkeleton />}>
                            <Streams />
                        </Suspense>
                    )
                },
                { path: "chat/messages", element: <Chats /> },
                { path: "people", element: <People /> },
                { path: "following", element: <Followings /> },
                { path: "followers", element: <Followers /> },
                { path: "photos", element: <Photos /> },
                { path: "notifications", element: <Notifications /> },
                { path: "profile/:username", element: <Profile /> }
            ]
        },
        { path: "*", element: <Error /> }
    ]);

    return routes;
};

export default AppRouter;
