interface ConteudoProps {
    children?: any;
}

export default function Template(props:ConteudoProps){
    return (
        <div className={`
        flex flex-col mx-7
        `}>
            {props.children}
        </div>
    )
}