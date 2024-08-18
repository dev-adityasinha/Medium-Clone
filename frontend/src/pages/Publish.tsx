import axios from "axios"
import { Appbar } from "../components/Appbar"
import { BACKEND_URL } from "../config"
import { ChangeEvent, useState } from "react"
import { useNavigate } from "react-router-dom"

export const Publish = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState(" ")
    const navigate = useNavigate()
    return (
        <>
            <Appbar />
            <div className="p-10">
                <div className="">
                    <label htmlFor="titleBox" className="block mb-2 font-medium text-gray-900 text-2xl">Title : </label>
                    <input onChange={e => setTitle(e.target.value)} name="titleBox" type="text" id="titleBox" className="bg-gray-50 border text-xl border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                </div>
                <div className="mt-4">
                    <TextEditor onChange={e => setDescription(e.target.value)} />
                </div>
                <div className=" w-full text-center border-2 p-1 text-2xl  rounded-md bg-green-500 mt-6 text-white border-green-500">
                    <button onClick={async () => {
                        const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                            title,
                            content: description
                        },
                            {
                                headers: {
                                    Authorization: localStorage.getItem("token")
                                }
                            });
                        navigate(`/blog/${response.data.id}`)
                    }}>Publish</button>
                </div>
            </div>
        </>
    )
}


function TextEditor({ onChange }: { onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void }) {
    return <div>  <label htmlFor="titleBox" className="block mb-2 font-medium text-gray-900 text-2xl">Description :</label>
        <textarea id="message" rows={16} onChange={onChange} className="block text-[1.1rem] p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border" placeholder="Write your description here..."></textarea>

    </div >
}