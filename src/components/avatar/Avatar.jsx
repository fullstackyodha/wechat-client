import React from "react";
import "@/components/avatar/Avatar.scss";
import PropTypes from "prop-types";

const Avatar = ({
    avatarSrc,
    name,
    bgColor = "white",
    textColor = "black",
    size,
    round = true
}) => {
    const textSizeRatio = 1.7;
    const fontSize = Math.floor(size / textSizeRatio);
    const firstNameChar = name?.charAt(0);

    return (
        <>
            {!avatarSrc && (
                <div
                    className="avatar-container"
                    data-testid="avatar-container"
                    style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        borderRadius: `${round ? "50%" : ""}`,
                        backgroundColor: `${!avatarSrc ? bgColor : ""}`,
                        display: "flex"
                    }}
                >
                    {name && (
                        <div
                            data-testid="avatar-name"
                            style={{
                                color: `${textColor}`,
                                fontSize: `${fontSize}`,
                                margin: "auto",
                                fontWeight: "bold",
                                textTransform: "uppercase"
                            }}
                        >
                            {firstNameChar}
                        </div>
                    )}
                </div>
            )}

            {avatarSrc && (
                <img
                    src={avatarSrc}
                    // VERY IMPORT TO HAVE ALT TEXT TO MAKE IT ACCESSIBLE FOR TESTING
                    alt="avatar"
                    className="avatar-content avatar-container"
                    style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        borderRadius: `${round ? "50%" : ""}`
                    }}
                />
            )}
        </>
    );
};

Avatar.PropTypes = {
    avatarSrc: PropTypes.string,
    name: PropTypes.string,
    bgColor: PropTypes.string,
    textColor: PropTypes.string,
    size: PropTypes.number,
    round: PropTypes.bool
};

export default Avatar;
