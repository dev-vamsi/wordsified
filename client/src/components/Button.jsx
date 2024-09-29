import React from "react";
import config from "../assets/data.json";

const Button = (props) => {
    const {
        text = "Button",
        className,
        bgColor = config.defaults.buttonBackGroundColor,
        textColor = config.defaults.buttonTextColor,
        onClick = () => {},
    } = props;
    return (
        <button
            className={`${
                className
                    ? className
                    : "px-4 py-2 mx-1 my-2 rounded-md hover:scale-110 duration-150 text-sm"
            }`}
            style={{ backgroundColor: bgColor, color: textColor }}
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default Button;
