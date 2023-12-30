import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";

import Button from "../../../components/button/Button";
import Input from "../../../components/input/Input";
import backgroundImg from "../../../assets/images/background.jpg";

import "./ForgotPassword.scss";
import { authService } from "../../../services/api/auth/auth.service";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [alertType, setAlertType] = useState("");
    const [responseMessage, setResponseMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [user, setUser] = useState("");

    async function forgotPassword(event) {
        setLoading(true);
        event.preventDefault();

        try {
            const response = await authService.forgotPassword(email);

            setLoading(false);
            setEmail("");
            setShowAlert(false);
            setAlertType("alert-success");
            setResponseMessage(response?.data?.message);
        } catch (error) {
            setLoading(false);
            setShowAlert(true);
            setAlertType("alert-error");
            setResponseMessage(error?.response?.data?.message);
        }
    }

    return (
        <div
            className="container-wrapper"
            style={{ backgroundImage: `url(${backgroundImg})` }}
        >
            <div className="environment">DEV</div>

            <div className="container-wrapper-auth">
                <div
                    className="tabs forgot-password-tabs"
                    style={{ height: `${responseMessage ? "320px" : ""}` }}
                >
                    <div className="tabs-auth">
                        <ul className="tab-group">
                            <li className="tab">
                                <div className="login forgot-password">
                                    Forgot Password
                                </div>
                            </li>
                        </ul>

                        <div className="tab-item">
                            <div className="auth-inner">
                                {responseMessage && (
                                    <div className={`alerts ${alertType}`} role="alert">
                                        {responseMessage}
                                    </div>
                                )}

                                <form
                                    className="forgot-password-form"
                                    onSubmit={forgotPassword}
                                >
                                    <div className="form-input-container">
                                        {/* password field */}
                                        <Input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={email}
                                            className=""
                                            placeholder=""
                                            labelText="Email"
                                            handleChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>

                                    {/* button component */}
                                    <Button
                                        label={`${
                                            loading
                                                ? "UPDATE PASSWORD..."
                                                : "UPDATE PASSWORD"
                                        }`}
                                        className="auth-button button"
                                        disabled={loading || !email}
                                    />

                                    <Link to={"/"} className="login">
                                        <FaArrowLeft className="arrow-left" />
                                        Login
                                    </Link>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
