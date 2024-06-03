"use client"

import { IconType } from "react-icons";

interface CategoryInputProps {
    onClick : (value:string) => void;
    label : string;
    selected? : boolean;
    icon : IconType;
}

const CategoryInput:React.FC<CategoryInputProps> = ({
    onClick,
    label,
    selected,
    icon : Icon
}) => {
    return ( 
        <div
        onClick={() => onClick(label)}
        className={`
        flex flex-col gap-2
        rounded-xl border-2 p-3
        hover:border-black transition cursor-pointer
        ${selected ? "border-black" : "border-neutral-200"}
        `}
        >
            <Icon size={25} />
            <div className="text-sm font-semibold">{label}</div>
        </div>
    );
}
 
export default CategoryInput;