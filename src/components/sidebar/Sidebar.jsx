import React, { useEffect, useState } from "react";
import "@/components/sidebar/Sidebar.scss";
import { sideBarItems } from "@/services/utils/static.data";
import { fontAwesomeIcons } from "@/services/utils/iconData";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
    const [sideBar, setSidebar] = useState([]);
    // Returns the current URL
    const location = useLocation();

    useEffect(() => {
        setSidebar(sideBarItems);
    }, []);

    const checkUrl = (name) => {
        return location.pathname.includes(name.toLowerCase());
    };

    return (
        <div className="app-side-menu">
            <div className="side-menu">
                <ul className="list-unstyled">
                    {sideBar.map((item) => {
                        let iconName = item?.iconName;

                        return (
                            <li key={item?.index}>
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
