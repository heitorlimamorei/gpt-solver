/* eslint-disable @next/next/no-img-element */
import React, {memo} from "react";
import { loginIcon } from "./icons/Icones";

function Button(props) {
    return (
        <button disabled={props.disabled ?? false} className={`
        ${props.ClassName}
        dark:bg-[#232323] bg-[#E0E5EC] 
        dark:shadow-[10px_10px_24px_#0e0e0e,-10px_-10px_24px_#383838]
        shadow-[10px_10px_24px_#727578,-10px_-10px_24px_#ffffff] 
        flex
        flex-row
        justify-center
        items-center`}
        onClick={props.onClick}>
            <p className={props.iconClassName}>{props.icon}</p>            
            <p className={props.classChildren}>{props.children}</p>
            <p className={props.textClassName}>{props.text}</p>

        </button>
    );
}

export default memo(Button);