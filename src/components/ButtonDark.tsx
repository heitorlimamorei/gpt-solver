/* eslint-disable @next/next/no-img-element */
import React from "react";
import { loginIcon } from "./icons/Icones";

function ButtonDark(props) {
    return (
        <button className={`
        ${props.ClassName} 
        shadow-[12px_12px_24px_#0e0e0e,-12px_-12px_24px_#383838] 
        flex
        flex-row
        justify-center
        items-center`}>
            <p className={props.iconClassName}>{loginIcon()}</p>
            <p className={props.textClassName}>{props.text}</p>
        </button>
    );
}

export default ButtonDark;