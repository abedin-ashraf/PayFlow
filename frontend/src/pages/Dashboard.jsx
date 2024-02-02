import { useNavigate } from "react-router-dom"
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import { Transaction } from "../components/Transaction"
import { BankAndCards } from "../components/BankAndCards"

import axios from 'axios'
import { useState, useEffect } from "react"


export const Dashboard = () => {
    const [value, setValue] = useState();

    useEffect(() => {
        axios.get('https://payflow-backend.onrender.com/api/v1/account/balance', {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
            .then(response => { setValue(response.data.balance) })
    }, [])
    const navigate = useNavigate();



    return <div>
        <div><Appbar onClick={() => {
            localStorage.removeItem('token');
            navigate('/signin');
        }} /></div>

        {/* <div className="grid grid-cols-2"> */}
        <div className="md:flex justify-center">
            <div className="m-8">
                <div><Balance value={value} /></div>
                <div><BankAndCards /></div>
                <div><Users /></div>

            </div>
            <div >
                <Transaction value={value} />
                <div className="m-6 bg-white p-2 rounded-sm">
                    <div className="text-blue-500 font-bold">Take our quick survey</div>
                    <div className="text-sm">We want to know what you think about the new website. It will only take a few seconds</div>
                </div>
            </div>
        </div>


    </div >
}