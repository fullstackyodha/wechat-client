import Button from "../../../components/button/Button";
import Input from "../../../components/input/Input";
import { authService } from "../../../services/api/auth/auth.service";
import { Utils } from "../../../services/utils/utils.service";
import "./Register.scss";

import { useEffect, useState } from "react";

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [alertType, setAlertType] = useState("");
    const [hasError, setHasError] = useState(false);
    const [user, setUser] = useState("");

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

            // SET USERNAME IN LOCAL STORAGE

            // DISPATCH USERS TO REDUX

            setUser(response?.data?.user);
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
