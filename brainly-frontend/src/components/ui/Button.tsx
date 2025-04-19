import { ReactElement } from "react";

interface ButtonProps{
    variant: "primary" | "secondary";
    text: string;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    onClick?: () => void;
    loading ?: boolean;
};


const variantStyles= {
    "primary": "bg-purple-600 text-white hover:bg-purple-500",
    "secondary": "bg-purple-300 text-purple-600 hover:bg-purple-400"
}


const defaultStyles = "py-2 px-4 rounded-md flex items-center"

export const Button = ( props: ButtonProps) =>{
    return <button onClick={props.onClick} className={`${defaultStyles} ${variantStyles[props.variant]} ${props.loading?"cursor-progress opacity-45":"cursor-pointer"}`} disabled={props.loading}>
        {props.startIcon ? <div className="pr-2">{props.startIcon}</div>:null}
        {props.text}
        {props.endIcon ? <div className="pl-2">{props.endIcon}</div>:null}
    </button>
}