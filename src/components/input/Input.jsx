import PropTypes from "prop-types";
import "./Input.scss";

function Input(props) {
    const { id, name, type, placeholder, value, className, labelText, handleChange } = props;

    return (
        <>
            <div className="form-row">
                {labelText && (
                    <label htmlFor={name} className="form-label">
                        {labelText}
                    </label>
                )}

                <input
                    id={id}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    className={`form-input ${className}`}
                    value={value}
                    onChange={handleChange}
                    autoComplete="false"
                />
            </div>
        </>
    );
}

Input.PropTypes = {
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.any,
    className: PropTypes.string,
    labelText: PropTypes.string,
    handleChange: PropTypes.func
};

export default Input;
