import { FaArrowRight } from "react-icons/fa";

import Button from "../../../components/button/Button";
import Input from "../../../components/input/Input";
import "./Login.scss";
import { Link } from "react-router-dom";

function Login() {
    return (
        <>
            <div className="auth-inner">
                <div className="alerts alert-error" role="alert">
                    Invalid Credentials
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

                        <label className="checkmark-container" htmlFor="checkbox">
                            <Input id="checkbox" type="checkbox" name="checkbox" value={false} />
                            Keep me logged in
                        </label>
                    </div>

                    {/* button component */}
                    <Button
                        label="LOGIN"
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

export default Login;
