import { useRef } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { useNavigate } from "react-router-dom";

export function Signin(){
    const usernameRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const navigate = useNavigate();
    async function signin(){
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        console.log(username)
        const response = await axios.post(`${BACKEND_URL}/api/v1/signin`,{
            username,
            password
        })
        const jwt = response.data.token;
        localStorage.setItem("token",jwt);
        navigate("/dashboard");
    }
    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white rounded-md  border border-gray-400 min-w-48 flex flex-col items-center p-4">
            
            <Input placeholder="Username" reference={usernameRef}/>

            <div className="pb-3">
            <Input placeholder="Password" type="password" reference={passwordRef}/>
            </div>

            <Button onClick={signin} variant="primary"  text="Signin"/>
        </div>

    </div>
}