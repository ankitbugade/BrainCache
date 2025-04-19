
export function Input({placeholder,type,reference}: {placeholder:string,type?:string, reference?:any}){
    return <div>
        <input placeholder={placeholder} type={type || "text"} ref={reference} className="px-4 py-2 border rounded m-2" ></input>
    </div>
}
