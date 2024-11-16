import React, { useEffect, useState } from "react";
import "@/components/sidebar/Sidebar.scss";
import { sideBarItems } from "@/services/utils/static.data";
import { fontAwesomeIcons } from "@/services/utils/iconData";
import { createSearchParams, Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {
    const [sideBar, setSidebar] = useState([]);

    // Returns the current URL
    const location = useLocation();
    const navigate = useNavigate();

    const { profile } = useSelector((state) => state.user);

    useEffect(() => {
        setSidebar(sideBarItems);
    }, []);

    const checkUrl = (name) => {
        return location.pathname.includes(name.toLowerCase());
    };

    const navigateToPage = (name, url) => {
        if (name == "Profile") {
            url = `${url}/${profile?.username}?${createSearchParams({ id: profile?._id, uid: profile?.uId })}`;
        }

        navigate(url);
    };

    return (
        <div className="app-side-menu">
            <div className="side-menu">
                <ul className="list-unstyled">
                    {sideBar.map((item) => {
                        let iconName = item?.iconName;

                        return (
                            <li
                                key={item?.index}
                                onClick={() => navigateToPage(item?.name, item?.url)}
                            >
                                <div
                                    data-testid="sidebar-list"
                                    className={`sidebar-link ${checkUrl(item?.name) ? "active" : ""}`}
                                >
                                    <div className="menu-icon">
                                        {fontAwesomeIcons[item.iconName]}
                                    </div>
                                    <div className="menu-link">
                                        <span>{item?.name}</span>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
