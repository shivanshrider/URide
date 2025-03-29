const UserModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');


module.exports.registerUser = async (req, res, next) => {
    const erroes = validationResult(req);
    if (!erroes.isEmpty()) {
        return res.status(422).json({ errors: erroes.array() });
    }
        const { fullname, email, password } = req.body;
        
        const hashedPassword =  UserModel.hashPassword(password);
        const user = await userService.createUser({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword
        });

        const token= user.generateAuthToken();

        res.status(201).json({token, user})


    }