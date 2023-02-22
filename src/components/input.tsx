interface inputProps {
    ClassName: string
    name: string
    id: string
    type: string
    value: any
    onChange: any
}

function Input(props: inputProps) {
    return (
        <input 
        id={props.id} 
        name={props.name} 
        className={`dark:bg-[#232323] bg-[#E0E5EC] rounded-xl h-[2.4rem] p-3
        shadow-[inset_9px_9px_18px_#5a5c5e,inset_-9px_-9px_18px_#ffffff]
        dark:shadow-[inset_9px_9px_18px_#0e0e0e,inset_-9px_-9px_18px_#383838]`}
        value={props.value}
        onChange={props.onChange}
        type={props.type}
        required>
        </input>
    );
}

export default Input;