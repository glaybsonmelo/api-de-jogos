const express = require('express');
const router = express.Router();
const User = require('./User');
const jwt = require('jsonwebtoken');
const auth = require("../middleware/userAuth");



const JWTsecret = "lkugefefggr4rghr4hewtçaefg";

router.get('/users', (req, res) => {
    let emailLogged = req.loggedUser;
    res.statusCode = 200;
    User.findAll().then(users => {
        res.json(users);
    }).catch(err => {res.sendStatus(200)})
});

// Create user
router.post('/user', (req, res) => {
    let {name, email, password} = req.body;
    if(name != undefined || email != undefined || password != undefined){
        User.create({
            name:name,
            email:email,
            password:password
        }).then(() => {
            res.statusCode = 200;
            res.sendStatus(200);
        }).catch(err => {res.sendStatus(400)});
    }
    else res.sendStatus(400);
});

// Delete user
router.delete('/user/:id', (req, res) => {
    let userId = req.params.id;
    if(isNaN(userId) || userId == undefined) res.sendStatus(400);
    else{
        User.destroy({where:{id:userId}}).then(() => {
            res.sendStatus(200);
        }).catch(err => {res.sendStatus(400)});
    }
});

router.post('/user/auth', (req, res) => {
    let {email, password} = req.body;
    if(email != undefined || password != undefined){
        User.findOne({where:{email:email}}).then(user => {
            if(password == user.password){
                jwt.sign({id:user.id, email:email}, JWTsecret, {expiresIn:"48h"}, (err, token) => {
                    if(err){
                        res.status(400)
                        res.json({err:"Erro interno!"});
                    }
                    else{
                        res.status(200);
                        res.json({token:token});
                    };
                });
            }
            else{
                res.status(401);
                res.json({"erro":"password incorrect"});
            }
        }).catch(err => {
            res.status(400);
            res.json({"erro":"email not registered"});
        })
    }
    else{
        res.status(400);
        res.json({"erro":"Email or password invalid!"})
    }
});

module.exports = router;