import { ChangeEvent } from "react"

interface InputType {
    label: string,
    placeholder: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    type?: string
}

export const Input = ({ label, placeholder, onChange, type }: InputType) => {
    return (
        <div>
            <label htmlFor="first_name" className="text-md block mb-2 font-semibold mt-4">{label}</label>
            <input type={type || "text"} onChange={onChange} className=" mt-2 p-2 w-[350px] outline outline-1 focus:outline-2 rounded-sm text-md block " placeholder={placeholder} required />
        </div>
    )
}