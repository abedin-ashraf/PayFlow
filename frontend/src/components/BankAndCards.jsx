import React from 'react'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CreditCardIcon from '@mui/icons-material/CreditCard';

export const BankAndCards = () => {
    return <div className='bg-white mt-6 p-3 rounded-md'>

        <div className='font-bold text-blue-500 text-base'>Bank and cards</div>
        <hr className='' />

        <div className="p-2 mt-4 mb-6">
            <div className="flex items-center ml-4 text-base mb-3">
                <AccountBalanceIcon />
                <div className='ml-4'>
                    <div>US BANK, MO</div>
                    <div className='text-sm'>Checking ending with ********7384</div>
                </div>
            </div>
            <div className="flex items-center ml-4 text-base">
                <CreditCardIcon />
                <div className='ml-4'>
                    <div>DISCOVER</div>
                    <div className='text-sm'>Card endig with ********7384</div>
                </div>
            </div>
        </div>
        <div className='flex justify-around mb-4'>
            <button class="rounded-full text-blue-400 text-sm font-medium border-solid border-2 px-2 py-1">Link a card or bank</button>
            <button class="rounded-full text-blue-400 text-sm font-medium border-solid border-2 px-2 py-1">Manage cards or banks</button>
        </div>
    </div>
}


