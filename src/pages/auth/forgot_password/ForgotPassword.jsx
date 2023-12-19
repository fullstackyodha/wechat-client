import { FaArrowLeft } from "react-icons/fa";
import Button from "../../../components/button/Button";
import Input from "../../../components/input/Input";
import backgroundImg from "../../../assets/images/background.jpg";

import "./ForgotPassword.scss";

import { Link } from "react-router-dom";

function ForgotPassword() {
    return (
        <div
            className="container-wrapper"
            style={{ backgroundImage: `url(${backgroundImg})` }}
        >
            <div className="environment">DEV</div>

            <div className="container-wrapper-auth">
                <div className="tabs forgot-password-tabs">
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
                                {/* <div className="alerts alert-error" role="alert">
                                    Invalid Credentials
                                </div> */}

                                <form className="forgot-password-form">
                                    <div className="form-input-container">
                                        {/* password field */}
                                        <Input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value=""
                                            className=""
                                            placeholder=""
                                            labelText="Email"
                                            handleChange={() => {}}
                                        />
                                    </div>

                                    {/* button component */}
                                    <Button
                                        label="UPDATE PASSWORD"
                                        className="auth-button button"
                                        disabled="true"
                                        handleClick={() => {}}
                                    />

                                    <Link to={"/"}>
                                        <span className="login">
                                            <FaArrowLeft className="arrow-left" />
                                            Login
                                        </span>
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
