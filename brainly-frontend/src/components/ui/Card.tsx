import axios from "axios";
import { BACKEND_URL } from "../../../config";
import { useContent } from "../../hooks/useContent";
import { ShareIcon } from "../../icons/ShareIcon";
import { TrashIcon } from "../../icons/TrashIcon";
import { EditIcon } from "../../icons/EditIcon";

interface CardProps {
    title: string;
    link: string;
    type: "twitter" | "youtube";
    contentId: string;
}

export function Card({title, link, type, contentId}: CardProps){
    const {refresh} = useContent();

    const handleDelete = async()=>{
        try{
            await axios.delete(`${BACKEND_URL}/api/v1/content`,{
                data:{contentId},
                headers:{
                    Authorization:localStorage.getItem("token")
                }
            });
            refresh();
        }
        catch(error){
            console.error("Error deleting content:", error);
        }
    }

    const handleShare = async()=>{
        try{
            var shareLink = link;
            if(type==="youtube"){
                shareLink = shareLink.replace("embed","watch").replace("watch/","watch?v=");
            } 
            else if(type==="twitter"){
                shareLink = shareLink.replace("twitter","x");
            }
            await navigator.clipboard.writeText(shareLink);
            alert("Link copied to clipboard!");
        }
        catch(error){
            console.error("Error sharing content:", error);
        }
    }

    return (
        <div >
            <div className="p-4 bg-white rounded-md border border-gray-300 max-w-72 min-h-48 min-w-72">
                <div className="flex justify-between">
                    <div className="flex items-center ">
                        <div className="pr-2 text-gray-500">
                            <EditIcon/>
                        </div>
                        <span className="font-light">{title}</span>
                    </div>
                    <div className="flex items-center">
                        <div className="pr-2 text-gray-500">
                        <a className="hover:cursor-pointer" onClick={handleShare}>
                        <ShareIcon/>
                        </a>
                        </div>
                        <div className="pr-2 text-gray-500 hover:cursor-pointer" onClick={handleDelete} >
                        <TrashIcon/>
                        </div>
                    </div>
                </div>
                <div className="pt-4">
                    {type === "youtube" &&<iframe className="w-full" src={link.replace("watch","embed").replace("?v=","/")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}

                    {type === "twitter" && <blockquote className="twitter-tweet">
                    <a href={link.replace("x","twitter")}></a>
                    </blockquote>}
                    
                </div>
            </div>
            
        </div>
    )
}