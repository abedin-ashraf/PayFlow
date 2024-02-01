const mongoose = require('mongoose');
const { Schema, number } = require('zod');
mongoose.connect("mongodb+srv://admin:FSzAE8q87LSd2faf@cluster0.uof1tyg.mongodb.net/payflow");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50

    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
})
const acountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,  //Reference to User Model
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
})

const transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,  //Reference to User Model
        ref: 'User',
        required: true
    },
    transactions: [
        {
            amount: {
                type: Number,
                required: true
            },
            type: {
                type: String,
                enum: ['Debit', 'Credit'],
                required: true,
            },
            recipientId: {
                type: mongoose.Schema.Types.ObjectId,  //Reference to User Model
                ref: 'User',
                required: true
            },
            timestamp: {
                type: Date,
                default: new Date()

            }
        }
    ]
})

const User = mongoose.model('User', UserSchema);
const Account = mongoose.model("Account", acountSchema);
const Transaction = mongoose.model("Transactions", transactionSchema);

module.exports = {
    User,
    Account,
    Transaction
}