import React from "react";
import config from "../assets/data.json";

const Input = (props) => {
    const {
        type = "text",
        className,
        placeholder,
        borderColor = config.defaults.inputBorderColor,
        outlineColor = config.defaults.inputOutlineColor,
        onChange = () => {},
        ref = null,
        name = "",
    } = props;
    return (
        <input
            type={type}
            name={name}
            ref={ref}
            className={`${
                className
                    ? className
                    : "border-2 rounded-md px-2 py-2 w-full m-1 text-sm shadow-sm bg-transparent placeholder:text-black"
            }`}
            style={{
                borderColor: borderColor,
                outlineColor: outlineColor,
            }}
            placeholder={placeholder ? placeholder : "Enter..."}
            onChange={onChange}
        />
    );
};

export default Input;
