import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import Button from "../../../components/button/Button";
import Input from "../../../components/input/Input";
import { authService } from "../../../services/api/auth/auth.service";
import "./Login.scss";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [hasError, setHasError] = useState(false);
    const [alertType, setAlertType] = useState("");
    const [user, setUser] = useState("");

    async function loginUser(e) {
        setLoading(true);
        e.preventDefault();

        try {
            // CALLING THE API & SENDING THE DATA
            const response = await authService.signIn({
                username,
                password
            });
            console.log(response.data.data);

            // SET LOGGED IN TO TRUE IN LOCAL STORAGE

            // SET USERNAME IN LOCAL STORAGE

            // DISPATCH USERS TO REDUX

            setUser(response?.data?.user);
            setLoggedIn(loggedIn);
            setHasError(false);
            setAlertType("alert-success");
        } catch (error) {
            setLoading(false);
            setAlertType("alert-error");
            setHasError(true);
            setErrorMessage(error?.response?.data.message);
        }
    }

    useEffect(() => {
        if (loading & !user) {
            return;
        }

        if (user) {
            console.log("NAVIGATE TO STREAMS PAGE");
            setLoading(false);
        }
    }, [loading, user]);

    return (
        <>
            <div className="auth-inner">
                {hasError && errorMessage && (
                    <div className={`alerts ${alertType}`} role="alert">
                        {errorMessage}
                    </div>
                )}

                <form className="auth-form" onSubmit={loginUser}>
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

                        <label className="checkmark-container" htmlFor="checkbox">
                            <Input
                                id="checkbox"
                                type="checkbox"
                                name="checkbox"
                                value={loggedIn}
                                handleChange={() => setLoggedIn((state) => !state)}
                            />
                            Keep me logged in
                        </label>
                    </div>

                    {/* button component */}
                    <Button
                        label={`${loading ? "LOGGING IN..." : "LOGIN"}`}
                        className="auth-button button"
                        disabled={loading || !username || !password}
                    />

                    <div className="forgot-password">
                        <Link to={"/forgot-password"}>Forgot password?</Link>
                        <FaArrowRight className="arrow-right" />
                    </div>
                </form>
            </div>
        </>
    );
}

export default Login;