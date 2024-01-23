const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const zod = require('zod');
const { authMiddleware } = require('../middleware')
const { JWT_SECRET } = require('../config');
const { User, Account } = require('../db');

const signupBody = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
})


router.post('/signup', async (req, res) => {

    const { success } = signupBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs",
        })
    }

    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken"
        })
    }

    const user = await User.create({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password
    });

    const userId = user._id;

    //Creating a new Account for the User
    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })
    //////////////////////////////////////

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.status(200).json({
        message: "User created successfully",
        token: "Bearer " + token
    })
})

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

router.post('/signin', async (req, res) => {
    const { success } = signinBody.safeParse(req.body);

    if (!success) {
        return res.status(411).json({
            message: "Incorrect Inputs"
        })
    }


    const existingUser = await User.findOne({ username: req.body.username, password: req.body.password });

    if (!existingUser) {
        return res.status(411).json({
            message: "User is not registered"
        })
    }
    const userId = existingUser._id;
    res.status(200).json({
        token: "Bearer " + jwt.sign({ userId }, JWT_SECRET)
    })

})
const updatebody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
})

router.put('/', authMiddleware, async (req, res) => {
    const { success } = updatebody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Incorrect Information for Updating"
        })
    }
    console.log(req.userId);

    await User.updateOne({ _id: req.userId }, req.body);
    res.status(200).json({
        message: "Updated successfully"
    })

})

router.get('/bulk', async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }
        ]
    })
    res.status(200).json({
        users: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})
module.exports = router;