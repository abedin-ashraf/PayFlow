import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


export const Balance = ({ value }) => {
    const date = new Date();
    const [name, setLastName] = useState("");

    useEffect(() => {
        axios.get('http://localhost:3000/api/v1/user/name', {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
            .then(response => { setLastName(response.data.firstName) })
    }, [])



    return <div className='bg-white p-3 rounded-sm'>
        <div className='flex justify-between items-center'>
            <div className='font-bold text-blue-500 text-lg'>Current Balance</div>
            <div className="text-xs" >{date.toString().substring(0, 15)}</div>
        </div>
        <hr className='' />


        <div className='font-semi text-base mt-2'>
            <h3>Welcome, {name}</h3>
        </div>
        <div className="flex justify-center items-baseline mt-4 mb-6">
            <div className="text-5xl font-normal">
                $ {value}
            </div>
            <div className="ml-4 text-sm">
                Available
            </div>
        </div>
        <div className='flex justify-between mb-4'>
            <button class="rounded-full text-blue-400 text-sm font-medium border-solid border-2 px-2 py-1">Transfer Money</button>
            <button class="rounded-full text-blue-400 text-sm font-medium border-solid border-2 px-2 py-1">Add Money</button>
            <button class="rounded-full text-blue-400 text-sm font-medium border-solid border-2 px-2 py-1">Manage currencies</button>
        </div>
    </div>
}