import { useEffect, useState } from "react"
import axios from 'axios'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export const Transaction = () => {
    const [transactions, setTransactions] = useState([]);
    useEffect(() => {
        axios.get('https://payflow-backend.onrender.com/api/v1/user/transactions', {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
            .then(response => {
                setTransactions(response.data.transaction);
            })
    }, []);

    return <div className="m-6 bg-white pt-4 rounded-md" >
        <div className='font-bold text-base text-blue-500 text-center '>Recent Activity</div>
        <div className=" border-2">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Timestamp</TableCell>
                            <TableCell align="center">Amount</TableCell>
                            <TableCell align="center">Type</TableCell>
                            <TableCell align="center">Recipient ID</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactions.map((transaction) => (
                            <TableRow
                                key={transaction._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center">{transaction.timestamp.slice(0, 16).replace("T", " ")}</TableCell>
                                <TableCell align="center" component="th" scope="row">{transaction.amount}</TableCell>
                                <TableCell align="center" className={`rounded-md ${transaction.type === 'Credit' ? 'bg-lime-400' : 'bg-red-400'}`}>{transaction.type}</TableCell>
                                {/* <TableCell align="center">{value}</TableCell> */}
                                <TableCell align="center">{transaction.recipientId}</TableCell>
                                {/* <TableCell align="right">{row.protein}</TableCell> */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    </div>
}