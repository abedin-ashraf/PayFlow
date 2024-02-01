import { useState, useEffect } from "react"
import axios from "axios";


export const Appbar = ({ onClick }) => {

    const [name, setLastName] = useState("");

    useEffect(() => {
        axios.get('http://localhost:3000/api/v1/user/name', {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
            .then(response => { setLastName(response.data.firstName) })
    }, [])

    return <div className="shadow h-14 flex justify-between">
        <div className="flex flex-col justify-center h-full ml-4">
            PayFlow
        </div>
        <div className="flex">
            {/* <div className="flex flex-col justify-center h-full mr-4">
                Hello, {name}
            </div> */}
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl"> {name[0]}
                    {/* <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                        <span className="text-2xl text-white">{name[0].toUpperCase()}</span>
                    </div> */}
                </div>
            </div>
            <button onClick={onClick} className="h-12 w-18 mt-1 mr-2 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Logout</button>
        </div>
    </div>
}