import React, { useCallback, useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import { useEffectOnce } from "@/hooks/useEffectOnce";
import { userService } from "@/services/api/user/user.service";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "@/redux_toolkit/reducers/users.reducers";
import { Utils } from "@/services/utils/utils.service";
import { Navigate, useNavigate } from "react-router-dom";
import { PropTypes } from "prop-types";

const ProtectedRoute = ({ children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { profile, token } = useSelector((state) => state.user);

    const [userData, setUserData] = useState(null);
    const [tokenIsValid, setTokenIsValid] = useState(false);

    const keepLoggedIn = useLocalStorage("keepLoggedIn", "get");
    const pageReload = useSessionStorage("pageReload", "get");

    const [deleteStorageUsername] = useLocalStorage("username", "delete");
    const [deleteSessionPageReload] = useSessionStorage("pageReload", "delete");

    const [setLoggedIn] = useLocalStorage("keepLoggedIn", "set");

    // memoized version of the callback, only changes if one of the inputs has changed
    const checkUser = useCallback(async () => {
        try {
            const response = await userService.checkCurrentUser();
            setUserData(response?.data?.user);
            setTokenIsValid(true);
            dispatch(
                addUser({ token: response?.data?.token, profile: response?.data?.user })
            );
        } catch (err) {
            setTokenIsValid(false);
            setTimeout(async () => {
                Utils.clearStore({
                    dispatch,
                    deleteStorageUsername,
                    deleteSessionPageReload,
                    setLoggedIn
                });

                await userService.logoutUser();

                navigate("/");
            }, 2000);
        }
    }, [dispatch, navigate, deleteStorageUsername, deleteSessionPageReload, setLoggedIn]);

    useEffectOnce(() => {
        checkUser();
    });

    if (keepLoggedIn || (!keepLoggedIn && userData) || (profile && token) || pageReload) {
        if (!tokenIsValid) {
            return <></>;
        } else {
            return <>{children}</>;
        }
    } else {
        return <>{<Navigate to="/" />}</>;
    }
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired
};

export default ProtectedRoute;
