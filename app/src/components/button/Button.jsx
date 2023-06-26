import React from "react";
import "./Button.css";

const Button = ({text, className}) => {
    return (
        <button type="button" className={className}>{text}</button>
    );
};

export default Button
