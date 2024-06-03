import { IconType } from "react-icons";

interface ButtonProps {
    label? : string;
    onClick : () => void;
    disabled? : boolean;
    outline? : boolean;
    small? : boolean;
    icon? : IconType;
    iconStyle? : {};
}

const Button:React.FC<ButtonProps> = ({
    label,
    onClick,
    disabled,
    outline,
    small,
    icon : Icon,
    iconStyle
}) => {
    return ( 
        <button
        onClick={onClick}
        className={`
        relative
        w-full
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        transition
        text-base
        ${outline
            ? "bg-white border-black text-black  hover:bg-neutral-200"
            : "bg-rose-500 border-rose-500 text-white hover:opacity-80"
        }
        ${small 
            ? "p-1 border-[1px] font-light"
            : "p-2 border-2 font-bold"
        }
        `}
        >   
            {Icon && (
                <Icon 
                size={22}
                className="absolute left-5 top-1.5"
                style={iconStyle}
                />
            )}
            {label}
        </button>
    );
}
 
export default Button;