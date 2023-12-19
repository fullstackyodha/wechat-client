import PropTypes from "prop-types";

function Button(props) {
    const { label, className, disabled, handleClick } = props;

    return (
        <>
            <button className={className} disbabled={disabled} onClick={handleClick}>
                {label}
            </button>
        </>
    );
}

Button.PropTypes = {
    label: PropTypes.any.isRequired,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    handleClick: PropTypes.func
};

export default Button;
