import React from "react";
import { Outlet } from "react-router-dom";

import "@/pages/social/Social.scss";
import Header from "@/components/header/Header";
import Sidebar from "@/components/sidebar/Sidebar";

const Social = () => {
    return (
        <>
            {/* GLOBAL HEADER COMPONENET */}
            <div>
                <Header />
            </div>

            {/* DASHBOARD COMPONENET */}
            <div className="dashboard">
                {/* SIDE BAR */}
                <div className="dashboard-sidebar">
                    <div>
                        <Sidebar />
                    </div>
                </div>

                {/* DASHBOARD CONTENT LIKE POSTS, ADD POST FORM ETC */}
                <div className="dashboard-content">
                    {/* Renders the child route's element, if there is one. */}
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default Social;
