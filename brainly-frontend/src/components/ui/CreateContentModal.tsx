import { useRef, useState } from "react";
import { CrossIcon } from "../../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../../../config";

enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter"
}

export function CreateContentModal({open, onClose}:{open:boolean, onClose:()=>void}){
    const titleRef = useRef<HTMLInputElement>();
    const linkRef = useRef<HTMLInputElement>();
    const [type,setType] = useState(ContentType.Youtube);

    async function addContent(){
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;

        await axios.post(`${BACKEND_URL}/api/v1/content`,{
            link,
            title,
            type
        },{
            headers:{
                Authorization: localStorage.getItem("token")
            }
        }
        )
        onClose();
    }

    return <div className="bg-opacity-10">
        { open && <div className=" w-screen h-screen bg-slate-500/60 fixed top-0 left-0 flex  justify-center ">
        <div className="flex-col flex justify-center">
            <div className=" bg-white p-5 border-2  border-amber-900 rounded-md">
                <div onClick={onClose} className="flex justify-end">
                    <div onClick={onClose} className="hover:cursor-pointer">
                        <CrossIcon/>
                    </div>
                </div>
                <div>
                    <Input placeholder={"Title"} reference={titleRef}/>
                </div>
                <div>
                    <Input placeholder={"Link"} reference={linkRef}/>
                </div>
                <span className="text-gray-600 align ml-2">Type</span>
                <div className="flex p-2 justify-center">
                    <div className="pr-2">
                        <Button text="Youtube" variant={type === ContentType.Youtube ? "secondary" : "primary"} onClick={() => {
                            setType(ContentType.Youtube)
                        }}/>
                    </div>
                    <div>
                        <Button text="Twitter" variant={type === ContentType.Twitter ? "secondary" : "primary"}
                        onClick={()=>{ setType(ContentType.Twitter)}}/>
                    </div>
                </div>
                <div className="content-center ml-2">
                    <Button variant="primary" text="Submit" onClick={addContent}/>
                </div>
            </div>
        </div>
            
        </div>}
    </div>
}


