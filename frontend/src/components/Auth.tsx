import { Link, useNavigate } from "react-router-dom"
import { Input } from "./Input"
import { useState } from "react"
import { SignupInput } from "@npm.adityasinha/medium-common-zod"
import { BACKEND_URL } from "../config"
import axios from "axios"

export const Auth = ({ type }: { type: "signin" | "signup" }) => {
    const navigate = useNavigate()
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        email: "",
        password: ""
    })

    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs)
            const jwt = response.data
            localStorage.setItem("token", jwt)
            await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
                headers: {
                    'authorization': jwt,
                }
            }
            );
            navigate('/blogs')
        } catch (error) {
            // alert the user that the req failed
            alert(`Error while signin up`)
        }
    }

    return <div className="h-screen flex place-items-center justify-center flex-col ">
        <div>
            <div className="text-4xl font-extrabold">
                Create an account
            </div>
            <div className="text-center text-slate-400">
                {type == "signin" ? "Don't have an account?" : "Already have an account?"}
                <Link to={type === 'signin' ? "/signup" : "/signin"} className="underline pl-1">{type === "signin" ? "SignUp" : "SignIn"}</Link>
            </div>
        </div>
        <div>
            {type === "signup" ? <Input label="Username" placeholder="Enter Username" onChange={(e) => {
                setPostInputs({
                    ...postInputs,
                    name: e.target.value
                })
            }} /> : null}
            <Input type={"email"} label="Email" placeholder="Enter Email" onChange={(e) => {
                setPostInputs({
                    ...postInputs,
                    email: e.target.value
                })
            }} />
            <Input type={"password"} label="Password" placeholder="Enter Username" onChange={(e) => {
                setPostInputs({
                    ...postInputs,
                    password: e.target.value
                })
            }} />
            <button onClick={sendRequest} className="w-full p-2 bg-black mt-5 rounded-sm text-white font-semibold text-xl">{type == "signup" ? "Sign Up" : "Sign In"}</button>
        </div>
    </div>
}