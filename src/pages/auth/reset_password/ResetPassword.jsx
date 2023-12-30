import { FaArrowLeft } from "react-icons/fa";
import { Link, useSearchParams } from "react-router-dom";
import { useState } from "react";

import Button from "../../../components/button/Button";
import Input from "../../../components/input/Input";
import backgroundImg from "../../../assets/images/background.jpg";
import { authService } from "../../../services/api/auth/auth.service";

import "./ResetPassword.scss";

function ResetPassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState("");
    const [alertType, setAlertType] = useState("");
    const [user, setUser] = useState("");

    const [searchParams] = useSearchParams();

    async function resetPassword(e) {
        setLoading(true);
        e.preventDefault();

        try {
            const response = await authService.resetPassword(
                {
                    password,
                    confirmPassword
                },
                searchParams.get("token")
            );

            setPassword("");
            setConfirmPassword("");
            setLoading(false);
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
                    className="tabs reset-password-tabs"
                    style={{ height: `${responseMessage ? "400px" : ""}` }}
                >
                    <div className="tabs-auth">
                        <ul className="tab-group">
                            <li className="tab">
                                <div className="login reset-password">Reset Password</div>
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
                                    className="reset-password-form"
                                    onSubmit={resetPassword}
                                >
                                    <div className="form-input-container">
                                        <Input
                                            id="password"
                                            name="password"
                                            type="password"
                                            value={password}
                                            labelText="New Password"
                                            placeholder="New Password"
                                            handleChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                        />

                                        <Input
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type="password"
                                            value={confirmPassword}
                                            labelText="Confirm Password"
                                            placeholder="Confirm Password"
                                            handleChange={(e) =>
                                                setConfirmPassword(e.target.value)
                                            }
                                        />
                                    </div>

                                    <Button
                                        label={`${
                                            loading
                                                ? "RESETING PASSWORD..."
                                                : "RESET PASSWORD"
                                        }`}
                                        className="auth-button button"
                                        disabled={
                                            loading || !password || !confirmPassword
                                        }
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

export default ResetPassword;
