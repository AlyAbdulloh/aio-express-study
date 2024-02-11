require('dotenv').config();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const User = require('../models/user');
const {API_SECRET} = process.env;


exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username: username} });

        const isValid = user && bcrypt.compareSync(password, user.password);
        if(!isValid){
            return res.status(401).json({message: "Invalid credentials"});
        }

        const token = jwt.sign({ 
            sub: user.id, 
            role: user.role
        }, API_SECRET);

        res.json({ accessToken: token });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}