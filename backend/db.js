const mongoose = require('mongoose');
const { Schema } = require('zod');
mongoose.connect("mongodb+srv://admin:FSzAE8q87LSd2faf@cluster0.uof1tyg.mongodb.net/paytm");

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

const User = mongoose.model('User', UserSchema);
const Account = mongoose.model("Account", acountSchema);

module.exports = {
    User,
    Account
}