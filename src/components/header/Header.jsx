import logo from "@/assets/images/wechatlogo.png";
import userAvatar from "@/assets/images/userAvatar.webp";

import { FaCaretDown, FaCaretUp, FaRegBell, FaRegEnvelope } from "react-icons/fa";

import "@/components/header/Header.scss";
import Avatar from "../avatar/Avatar";
import { useEffect, useRef, useState } from "react";
import { Utils } from "@/services/utils/utils.service";
import { useDetectOutsideClick } from "@/hooks/useDetectOutsideClick";
import MessageSidebar from "@/components/message-sidebar/MessageSidebar";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "../dropdown/Dropdown";
import { useEffectOnce } from "@/hooks/useEffectOnce";
import { ProfileUtils } from "@/services/utils/profile-utils.service";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import { userService } from "@/services/api/user/user.service";
import HeaderSkeleton from "./HeaderSkeleton";
import { notificationService } from "@/services/api/notifications/notifications.service";
import { NotificationUtils } from "@/services/utils/notifications-utils.service";
import NotificationPreview from "../dialog/NotificationPreview";
import { socketService } from "@/services/socket/socket.service";

const Header = () => {
    const { profile } = useSelector((state) => state.user);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [settings, setSettings] = useState([]);
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

    const storedUsername = useLocalStorage("username", "get");
    const [deleteStorageUsername] = useLocalStorage("username", "delete");
    const [setLoggedIn] = useLocalStorage("keepLoggedIn", "set");
    const [deleteSessionPageReload] = useSessionStorage("pageReload", "delete");

    const [notifications, setNotifications] = useState([]);
    const [notificationCount, setNotificationCount] = useState(0);
    const [notificationDialogContent, setNotificationDialogContent] = useState({
        post: "",
        imgUrl: "",
        title: "",
        comment: "",
        reaction: "",
        senderName: ""
    });

    useEffect(() => {
        const env = Utils.getAppEnvironment();
        setEnv(env);
    }, []);

    useEffectOnce(() => {
        Utils.mapSettingsDropdowItems(setSettings);
        getUserNotifications();
    });

    useEffect(() => {
        NotificationUtils.socketIONotification(
            profile,
            notifications,
            setNotifications,
            "header",
            setNotificationCount
        );
    }, [profile, notifications]);

    const openChatPage = () => {};

    const getUserNotifications = async () => {
        try {
            const response = await notificationService.getUserNotifications();

            const mappedNotifications = NotificationUtils.mapNotificationDropdownItems(
                response.data.data.notifications,
                setNotificationCount
            );

            setNotifications(mappedNotifications);

            socketService?.socket.emit("setup", { userId: storedUsername });
        } catch (error) {
            Utils.dispatchNotification(error.response?.data?.message, "error", dispatch);
        }
    };

    const onMarkAsRead = async (notification) => {
        try {
            NotificationUtils.markMessageAsRead(
                notification?._id,
                notification,
                setNotificationDialogContent
            );
        } catch (error) {
            Utils.dispatchNotification(error.response.data.message, "error", dispatch);
        }
    };

    const onDeleteNotification = async (messageId) => {
        try {
            const response = await notificationService.deleteNotification(messageId);
            Utils.dispatchNotification(response.data.message, "success", dispatch);
        } catch (error) {
            Utils.dispatchNotification(error.response.data.message, "error", dispatch);
        }
    };

    const onLogout = async () => {
        try {
            setLoggedIn(false);

            Utils.dispatchNotification("You have been logged out.", "success", dispatch);

            setTimeout(() => {
                Utils.clearStore({
                    dispatch,
                    deleteSessionPageReload,
                    deleteStorageUsername,
                    setLoggedIn
                });
            }, 2000);

            await userService.logoutUser();

            navigate("/");
        } catch (err) {
            console.log(err);
            Utils.dispatchNotification(err.response?.data?.message, "error", dispatch);
        }
    };

    return (
        <>
            {!profile ? (
                <HeaderSkeleton />
            ) : (
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

                    {notificationDialogContent?.senderName && (
                        <NotificationPreview
                            title={notificationDialogContent?.title}
                            post={notificationDialogContent?.post}
                            imgUrl={notificationDialogContent?.imgUrl}
                            comment={notificationDialogContent?.comment}
                            reaction={notificationDialogContent?.reaction}
                            senderName={notificationDialogContent?.senderName}
                            secondButtonText="Close"
                            // Reset the state
                            secondBtnHandler={() => {
                                setNotificationDialogContent({
                                    post: "",
                                    imgUrl: "",
                                    title: "",
                                    comment: "",
                                    reaction: "",
                                    senderName: ""
                                });
                            }}
                        />
                    )}

                    <div className="header-navbar">
                        <div
                            className="header-image"
                            data-testid="header-image"
                            onClick={() => navigate("/app/social/streams")}
                        >
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
                                    {notificationCount > 0 && (
                                        <span
                                            className="bg-danger-dots dots"
                                            data-testid="notification-dots"
                                        >
                                            {notificationCount}
                                        </span>
                                    )}
                                </span>
                                {isNotificationActive && (
                                    <ul className="dropdown-ul" ref={notificationRef}>
                                        <li className="dropdown-li">
                                            <Dropdown
                                                height={300}
                                                style={{ right: "250px", top: "20px" }}
                                                data={[]}
                                                notificationCount={notificationCount}
                                                title="Notifications"
                                                onMarkAsRead={onMarkAsRead}
                                                onDeleteNotification={
                                                    onDeleteNotification
                                                }
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
                                    setIsSettingsActive(false);
                                    setIsMessageActive(true);
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
                                    setIsSettingsActive(!isSettingsActive);
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
                                                style={{ right: "150px", top: "40px" }}
                                                data={settings}
                                                title="Settings"
                                                onLogout={onLogout}
                                                onNavigate={() =>
                                                    ProfileUtils.navigateToProfile(
                                                        profile,
                                                        navigate
                                                    )
                                                }
                                            />
                                        </li>
                                    </ul>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
};
export default Header;
