import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { useNavigate } from "react-router-dom"

import { GoogleOAuthProvider, GoogleLogin, useGoogleOneTapLogin } from '@react-oauth/google';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import axios from 'axios';

export const Signin = () => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign in"} />

                {/* <GoogleOAuthProvider clientId="<crypto-metric-412908>">
                    <GoogleLogin
                        onSuccess={credentialResponse => {
                            console.log(credentialResponse);
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                    />


                </GoogleOAuthProvider> */}


                <SubHeading label={"Enter your credentials to access your account"} />

                <InputBox onChange={e => {
                    setUserName(e.target.value);
                }} placeholder="harkirat@gmail.com" label={"Email"} />

                <InputBox onChange={e => {
                    setPassword(e.target.value);
                }} placeholder="123456" label={"Password"} />
                <div className="pt-4">
                    <Button onClick={async () => {
                        try {
                            const response = await axios.post('http://localhost:3000/api/v1/user/signin', { username, password });
                            localStorage.setItem('token', response.data.token);
                            toast("Signed in successfully");
                            setTimeout(() => {
                                navigate('/dashboard');
                            }, 1100);
                        } catch {
                            toast("Password and Email mismatch")
                        }
                    }} label={"Sign in"} />
                </div>
                <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
                <ToastContainer
                    position="top-right"
                    autoClose={1000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    transition:Bounce />
            </div>
        </div>
    </div>
}