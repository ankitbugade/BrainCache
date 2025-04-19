import { useState } from "react";
import { BrainlyIcon } from "../../icons/BrainlyIcon";
import { Twitter } from "../../icons/Twitter";
import { SideBarItem } from "./SidebarItem";
import { YouTubeIcon } from "./YoutubeIcon";

export function Sidebar({onFilterSelect}:{onFilterSelect:(type:string|null)=>void}){
    const [selectedType, setSelectedType] = useState<string | null>(null);

    const handleSelect = (type:string|null)=>{
        setSelectedType(type);
        onFilterSelect(type);
    }

    return <div className="h-screen border-r border-gray-300  bg-white w-72 fixed left-0 top-0 pl-6">
        <div className="flex text-2xl pt-4 items-center pl-1 text-purple-800">
            <BrainlyIcon/>
            <div 
                className={`font-bold text-gray-800 cursor-pointer `} onClick={()=>{handleSelect(null)}}
            >
            Brainly
            </div>
        </div>
        <div className="pt-4 pl-2">
            <SideBarItem 
                text="Twitter" 
                Icon={<Twitter/>} 
                onClick={()=>handleSelect("twitter")}
                isSelected={selectedType === "twitter"}
            />


            <SideBarItem 
                text="Youtube" 
                Icon={<YouTubeIcon/>} 
                onClick={()=>{handleSelect("youtube")}}
                isSelected={selectedType === "youtube"}
            />

        </div>
    </div>
}