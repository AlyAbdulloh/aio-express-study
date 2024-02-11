//Retrieve data using sequelize
// const sequelize = require('../../config/sequelize');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const { Op, where } = require("sequelize");

async function getUsers(req, res) {
    try {
        //find all users
        const users = await User.findAll();

        //Log the retrieved users
        // console.log('Retrieved Users:', users);

        res.json(users);
    } catch (error) {
        console.error('Error retrieving users', error);
    }
}

async function store(req, res) {
    try {

        await User.create({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8)
        });

        res.status(201).json({message: "Data was inserted!"});
    } catch (error) {
        res.json({message: error.message});
    }
}

async function getUserById(req, res) {
    try {
        let id = req.params.id;

        const data = await User.findByPk(id);
        if(!data){
            return res.json({message: "Data not found!"});
        }

        res.json(data);
    } catch (error) {
        res.json({message: error.message});
    }
}

async function update(req, res) {
    try {
        let id = req.params.id;

        let user = await User.findByPk(id);

        if(!user){
            return res.json({message: "Data not found!"});
        }

        await user.update({
            username: req.body.username,
            email: req.body.email,
        });

        return res.status(200).json({message: "Data was updated successfully"});
    } catch (error) {
        res.json({message: error.message});
    }
}

async function destroy(req, res) {
    try {
        let id = req.params.id;

        let user = await User.findByPk(id);

        if(!user){
            return res.json({message: "Data not found!"});
        }

        await user.destroy(id);

        return res.json({message: "Data was deleted"});
    } catch (error) {
        res.json({message: error.message});
    }
}

async function  search(req, res) {
    try {
        let data = await User.findAll({
            where: {
                username: {
                    [Op.like]: '%' + req.params.username+'%'
                }
            }
        });

        // if data not found
        if(data.length == 0){
            return res.status(404).json({message: 'Data not found!'});
        } 

        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }    
}


//call the function to retrieve users
module.exports = {
    getUsers,
    store,
    update,
    getUserById,
    destroy,
    search,
}