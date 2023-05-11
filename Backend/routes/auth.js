const express = require('express');
const User = require('../Models/User');
// use body instead of query if req is body type argument
const { body, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../Middleware/fetchuser')

const jwt_secret = 'thisisthetopsecretcode@##$'

//Create a user using : POST "/api/auth/createuser" . no login required
router.post('/createuser', [
    body("name").isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
], async (req, res) => {
    // checks for validation in input by user
    const result = validationResult(req);
    let success=false;
    // res.send(req.body)
    if (!result.isEmpty()) {
        res.send({ errors: result.array() });
        return
    }
    try {
        // checks for duplicate emails 
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ success, error: 'this email already exists' })
        }
        const salt = await bcrypt.genSalt(10);
        const securePassword = await bcrypt.hash(req.body.password, salt)
        // creates a new user
        user = await User.create({
            name: req.body.name,
            password: securePassword,
            email: req.body.email
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, jwt_secret);
        // res.send('Your data has been saved successfully');
        success=true;
        res.json({ success,authtoken })
    } catch (error) {
        console.log(error.message)
        res.status(500).send('unkown error occured')
    }
})

//login for a user using : POST "/api/auth/login" . no login required
router.post('/login', [
    body('email', 'Enter a Valid Email').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {
    // checks for validation in input by user
    const result = validationResult(req);
    // res.send(req.body)
    let success=false;
    if (!result.isEmpty()) {
        res.send({ errors: result.array() });
        return
    }
    const { email, password } = req.body
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({success, error: 'either email or password is incorrect' })
        }
        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            return res.status(404).json({success, error: 'either email or password is incorrect' })
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, jwt_secret);
        success=true;
        res.json({success, authtoken })
    } catch (error) {
        res.status(500).send('unkown error occured')
    }
})

//get logged user details : POST "/api/auth/getuser" . login required 
router.post('/getuser',fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password')
        res.send(user)
    } catch (error) {
        res.status(500).send('unkown error occured')
    }
})

module.exports = router