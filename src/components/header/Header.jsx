import logo from "@/assets/images/wechatlogo.png";
import userAvatar from "@/assets/images/userAvatar.webp";

import { FaCaretDown, FaCaretUp, FaRegBell, FaRegEnvelope } from "react-icons/fa";

import "@/components/header/Header.scss";
import Avatar from "../avatar/Avatar";
import { useEffect, useRef, useState } from "react";
import { Utils } from "@/services/utils/utils.service";
import { useDetectOutsideClick } from "@/hooks/useDetectOutsideClick";
import MessageSidebar from "@/components/message-sidebar/MessageSidebar";
import { useSelector } from "react-redux";
import Dropdown from "../dropdown/Dropdown";

const Header = () => {
    const { profile } = useSelector((state) => state.user);

    const [env, setEnv] = useState("");
    const messageRef = useRef(null);
    const notificationRef = useRef(null);
    const settingsRef = useRef(null);

    const { isActive: isMessageActive, setIsActive: setIsMessageActive } =
        useDetectOutsideClick(messageRef, false);

    const { isActive: isNotificationActive, setIsActive: setIsNotificationActive } =
        useDetectOutsideClick(notificationRef, false);

    const { isActive: isSettingsActive, setIsActive: setIsSettingsActive } =
        useDetectOutsideClick(settingsRef, false);

    const backgroundColor = `${env === "DEV" ? "#50B5FF" : env === "STG" ? "#e9710f" : ""}`;

    useEffect(() => {
        const env = Utils.getAppEnvironment();
        setEnv(env);
    }, []);

    const openChatPage = () => {};

    const onMarkAsRead = () => {};

    const onDeleteNotification = () => {};

    const onLogout = () => {};

    return (
        <>
            <div className="header-nav-wrapper" data-testid="header-wrapper">
                {/* MESSAGE SIDEBAR */}
                {isMessageActive && (
                    <div ref={messageRef}>
                        <MessageSidebar
                            profile={profile}
                            messageCount={0}
                            messageNotifications={[]}
                            openChatPage={openChatPage}
                        />
                    </div>
                )}
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
                        <li
                            className="header-nav-item active-item"
                            onClick={() => {
                                setIsMessageActive(false);
                                setIsSettingsActive(false);
                                setIsNotificationActive((prev) => !prev);
                            }}
                        >
                            <span className="header-list-name">
                                <FaRegBell className="header-list-icon" />
                                <span
                                    className="bg-danger-dots dots"
                                    data-testid="notification-dots"
                                ></span>
                            </span>
                            {isNotificationActive && (
                                <ul className="dropdown-ul" ref={notificationRef}>
                                    <li className="dropdown-li">
                                        <Dropdown
                                            height={300}
                                            style={{ right: "250px", top: "20px" }}
                                            data={[]}
                                            notificationCount={0}
                                            title="Notifications"
                                            onMarkAsRead={onMarkAsRead}
                                            onDeleteNotification={onDeleteNotification}
                                        />
                                    </li>
                                </ul>
                            )}
                            &nbsp;
                        </li>

                        {/* Message Icon */}
                        <li
                            className="header-nav-item active-item"
                            onClick={() => {
                                setIsNotificationActive(false);
                                setIsMessageActive(false);
                                setIsMessageActive((prev) => !prev);
                            }}
                        >
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
                        <li
                            className="header-nav-item"
                            onClick={() => {
                                setIsNotificationActive(false);
                                setIsMessageActive(false);
                                setIsSettingsActive((prev) => !prev);
                            }}
                        >
                            <span className="header-list-name profile-image">
                                <Avatar
                                    name={profile?.username}
                                    textColor="white"
                                    bgColor={profile?.avatarColor}
                                    size="40"
                                    round={true}
                                    avatarSrc={profile?.profilePicture}
                                />
                            </span>

                            <span className="header-list-name profile-name">
                                {profile?.username}
                                {!isSettingsActive ? (
                                    <FaCaretDown className="header-list-icon caret" />
                                ) : (
                                    <FaCaretUp className="header-list-icon caret" />
                                )}
                            </span>

                            {isSettingsActive && (
                                <ul className="dropdown-ul" ref={settingsRef}>
                                    <li className="dropdown-li">
                                        <Dropdown
                                            height={300}
                                            style={{ right: "200px", top: "40px" }}
                                            data={[]}
                                            title="Settings"
                                            onLogout={onLogout}
                                            onNavigate={() => {}}
                                        />
                                    </li>
                                </ul>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};
export default Header;
