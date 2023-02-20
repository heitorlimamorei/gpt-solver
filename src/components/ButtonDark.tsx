/* eslint-disable @next/next/no-img-element */
import React from "react";
import { loginIcon } from "./icons/Icones";

function ButtonDark(props) {
    return (
        <button className={`
        ${props.ClassName} 
        dark:shadow-[12px_12px_24px_#0e0e0e,-12px_-12px_24px_#383838]
        shadow-[12px_12px_24px_#727578,-12px_-12px_24px_#ffffff] 
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