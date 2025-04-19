import { ReactElement } from "react";

export function SideBarItem({text, Icon, onClick, isSelected}:{
    text:string,
    Icon: ReactElement,
    onClick: () => void,
    isSelected: boolean
}){
    return <div className={`flex items-center text-gray-700 mt-2 p-1 cursor-pointer hover:bg-gray-200 max-w-55 rounded-md transition-all duration-300 ${isSelected ? "bg-gray-200":""}`} onClick={onClick}>
        <div className="px-2 ">
            {Icon}
        </div>
        <div>
            {text}
        </div>
    </div>
}