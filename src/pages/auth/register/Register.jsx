import { FaArrowRight } from "react-icons/fa";

import Button from "../../../components/button/Button";
import Input from "../../../components/input/Input";
import "./Register.scss";

import { Link } from "react-router-dom";

function Register() {
    return (
        <>
            <div className="auth-inner">
                <div className="alerts alert-success" role="alert">
                    Registered Successfully
                </div>

                <form className="auth-form">
                    <div className="form-input-container">
                        {/* username field */}
                        <Input
                            id="username"
                            type="text"
                            name="username"
                            value=""
                            className=""
                            placeholder="Joe143"
                            labelText="Username"
                            handleChange={() => {}}
                        />

                        {/* email field */}
                        <Input
                            id="email"
                            type="text"
                            name="email"
                            value=""
                            className=""
                            placeholder="Joe14@gmail.com"
                            labelText="Email"
                            handleChange={() => {}}
                        />

                        {/* password field */}
                        <Input
                            type="password"
                            id="password"
                            name="password"
                            value=""
                            className=""
                            placeholder="Trojan@8992"
                            labelText="Password"
                            handleChange={() => {}}
                        />
                    </div>

                    {/* button component */}
                    <Button
                        label="REGISTER"
                        className="auth-button button"
                        disabled="true"
                        handleClick={() => {}}
                    />

                    <Link to={"/forgot-password"}>
                        <span className="forgot-password">
                            Forgot password? <FaArrowRight className="arrow-right" />
                        </span>
                    </Link>
                </form>
            </div>
        </>
    );
}

export default Register;
