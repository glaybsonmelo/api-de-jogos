const jwt = require("jsonwebtoken");


const JWTsecret = "lkugefefggr4rghr4hewtçaefg";

function auth(req, res, next){
    const authToken = req.headers["authorization"];
    if(authToken != undefined){
        const bearer = authToken.split(" ");
        const token = bearer[1];
        jwt.verify(token, JWTsecret, (err, data) => {
            if(err){
                res.status(401);
                res.json({err:'Token inválido'});
            }else{
                req.token = token;
                req.loggedUser = {id:data.id, email:data.email}
                next();
            }
        });
    }else{
        res.status(401);
        res.json({"erro":"Token inválido"});
    }
}

module.exports = auth;