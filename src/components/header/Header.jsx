import logo from "@/assets/images/wechatlogo.png";
import userAvatar from "@/assets/images/userAvatar.webp";

import { FaCaretDown, FaRegBell, FaRegEnvelope } from "react-icons/fa";

import "@/components/header/Header.scss";
import Avatar from "../avatar/Avatar";
import { useEffect, useState } from "react";
import { Utils } from "@/services/utils/utils.service";

const Header = () => {
    const [env, setEnv] = useState("");
    const backgroundColor = `${env === "DEV" ? "#50B5FF" : env === "STG" ? "#e9710f" : ""}`;

    useEffect(() => {
        const env = Utils.getAppEnvironment();
        setEnv(env);
    }, []);

    return (
        <>
            <div className="header-nav-wrapper" data-testid="header-wrapper">
                <div className="header-navbar">
                    <div className="header-image" data-testid="header-image">
                        <img src={logo} className="img-fluid" alt="" />

                        <div className="app-name">
                            Wechat
                            {env && (
                                <span
                                    className="environment"
                                    style={{
                                        backgroundColor: backgroundColor
                                    }}
                                >
                                    {env}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="header-menu-toggle">
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </div>

                    <ul className="header-nav">
                        {/* Bell Icon */}
                        <li className="header-nav-item active-item">
                            <span className="header-list-name">
                                <FaRegBell className="header-list-icon" />
                                <span
                                    className="bg-danger-dots dots"
                                    data-testid="notification-dots"
                                ></span>
                            </span>
                            <ul className="dropdown-ul">
                                <li className="dropdown-li"></li>
                            </ul>
                            &nbsp;
                        </li>

                        {/* Message Icon */}
                        <li className="header-nav-item active-item">
                            <span className="header-list-name">
                                <FaRegEnvelope className="header-list-icon" />
                                <span
                                    className="bg-danger-dots dots"
                                    data-testid="messages-dots"
                                ></span>
                            </span>
                            &nbsp;
                        </li>

                        {/* Avatar Icon */}
                        <li className="header-nav-item">
                            <span className="header-list-name profile-image">
                                <Avatar
                                    name="Harshal"
                                    textColor="white"
                                    bgColor="orange"
                                    size="30"
                                    round={true}
                                    // avatarSrc={"https://place-hold.it"}
                                />
                            </span>

                            <span className="header-list-name profile-name">
                                Harshal
                                <FaCaretDown className="header-list-icon caret" />
                            </span>

                            <ul className="dropdown-ul">
                                <li className="dropdown-li"></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};
export default Header;
