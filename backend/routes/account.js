const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { authMiddleware } = require('../middleware')
const { Account, Transaction } = require('../db')

router.get('/balance', authMiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    })
    res.status(200).json({
        balance: account.balance
    })
})

router.post('/transfer', authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    //Fetching the account within the transaction
    const account = await Account.findOne({ userId: req.userId }).session(session);

    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient Balance"
        })
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);
    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid Receiver Account"
        })
    }

    //Perform the transfer
    if (req.userId != to) {
        await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
        await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

        //Commit the tranaction
        await session.commitTransaction();

        //For updating Transaction in Sender DB
        const existingSender = await Transaction.findOne({ userId: req.userId });
        if (existingSender) {
            const newTransaction = {
                amount: amount,
                type: 'Debit',
                recipientId: to,
                timestamp: new Date(),
            }
            await Transaction.updateOne({ userId: req.userId }, { $push: { transactions: newTransaction } })
        } else {
            await Transaction.create({
                userId: req.userId,
                transactions: [
                    {
                        amount: amount,
                        type: 'Debit',
                        recipientId: to,
                        timestamp: new Date()
                    }
                ]
            })
        }
        //For updating Transaction in Reciever DB
        const existingReciever = await Transaction.findOne({ userId: to });
        if (existingReciever) {
            const newTransaction = {
                amount: amount,
                type: 'Credit',
                recipientId: req.userId,
                timestamp: new Date(),
            }
            await Transaction.updateOne({ userId: to }, { $push: { transactions: newTransaction } })
        } else {
            await Transaction.create({
                userId: to,
                transactions: [
                    {
                        amount: amount,
                        type: 'Credit',
                        recipientId: req.userId,
                        timestamp: new Date()
                    }
                ]
            })
        }

        return res.status(200).json({
            message: "Transfer successful"
        })
    }
    res.status(400).json({
        message: "Sending money to yourself"
    })
})

module.exports = router;