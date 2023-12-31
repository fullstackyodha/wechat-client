import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Button from "@/components/button/Button";
import Input from "@/components/input/Input";
import { Utils } from "@/services/utils/utils.service";
import { authService } from "@/services/api/auth/auth.service";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import "./Register.scss";

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [alertType, setAlertType] = useState("");
    const [hasError, setHasError] = useState(false);
    const [user, setUser] = useState("");

    const navigate = useNavigate();
    const [setStoredUsername] = useLocalStorage("username", "set");
    const [setLoggedIn] = useLocalStorage("keepLoggedIn", "set");
    const [pageReload] = useSessionStorage("pageReload", "set");

    const dispatch = useDispatch();

    const registerUser = async (event) => {
        setLoading(true);
        event.preventDefault();

        try {
            const avatarColor = Utils.avatarColor();
            const avatarImage = Utils.generateAvatarImage(
                username.charAt(0).toUpperCase(),
                avatarColor
            );

            // CALLING THE API & SENDING THE DATA
            const response = await authService.signUp({
                username,
                email,
                password,
                avatarColor,
                avatarImage
            });

            console.log(response);

            // SET REGISTERED USER TO TRUE IN LOCAL STORAGE
            setLoggedIn(true);

            // SET USERNAME IN LOCAL STORAGE
            setStoredUsername(username);

            // DISPATCH USERS TO REDUX
            Utils.dispatchUser(response?.data?.data, pageReload, dispatch, setUser);

            setLoading(false);
            setUsername("");
            setEmail("");
            setPassword("");
            setUser(response?.data?.data);
            setHasError(false);
            setAlertType("alert-success");
        } catch (error) {
            setLoading(false);
            setAlertType("alert-error");
            setHasError(true);
            setErrorMessage(error?.response?.data.message);
            console.log(error);
        }
    };

    useEffect(() => {
        if (loading & !user) {
            return;
        }

        if (user) {
            navigate("/app/social/streams");
        }
    }, [loading, user, navigate]);

    return (
        <>
            <div className="auth-inner">
                {hasError && errorMessage && (
                    <div className={`alerts ${alertType}`} role="alert">
                        {errorMessage}
                    </div>
                )}

                <form className="auth-form" onSubmit={registerUser}>
                    <div className="form-input-container">
                        {/* username field */}
                        <Input
                            id="username"
                            type="text"
                            name="username"
                            value={username}
                            className=""
                            style={{
                                border: `${hasError ? "1px solid #fa9b8a" : ""}`
                            }}
                            placeholder="Enter Username"
                            labelText="Username"
                            handleChange={(e) => setUsername(e.target.value)}
                        />

                        {/* email field */}
                        <Input
                            id="email"
                            type="text"
                            name="email"
                            value={email}
                            className=""
                            style={{
                                border: `${hasError ? "1px solid #fa9b8a" : ""}`
                            }}
                            placeholder="Email"
                            labelText="Email"
                            handleChange={(e) => setEmail(e.target.value)}
                        />

                        {/* password field */}
                        <Input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            className=""
                            style={{
                                border: `${hasError ? "1px solid #fa9b8a" : ""}`
                            }}
                            placeholder="Password"
                            labelText="Password"
                            handleChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {/* button component */}
                    <Button
                        label={`${loading ? "REGISTERING..." : "REGISTER"}`}
                        className="auth-button button"
                        disabled={!username || !email || !password}
                    />
                </form>
            </div>
        </>
    );
}

export default Register;
