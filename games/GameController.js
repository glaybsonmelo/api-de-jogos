const router = require('express').Router();
const auth = require("../middlewares/userAuth");
const Game = require('./Game');

router.get('/games', auth, (req, res) => {

    res.statusCode = 200;
    Game.findAll().then(games => {
        res.json({games});
    }).catch(err => {
        console.log(err)
        res.sendStatus(404)
    });
});

router.get('/game/:id', auth, (req, res) => {

    let id = parseInt(req.params.id);

    if(isNaN(id)){
        res.sendStatus(400);
    }else{

        let HATEOAS = [
            {
                href:"https://localhost:8080/game/" + id,
                rel:"delete_game",
                method:"DELETE"
            },
            {
                href:"https://localhost:8080/game/" + id,
                rel:"edit_game",
                method:"PUT"
            },
            {
                href:"https://localhost:8080/games",
                rel:"get_all_games",
                method:"GET"
            }
        ]

        Game.findByPk(id).then(game => {
            if(game != undefined) res.json({game:game, _links:HATEOAS});
            else res.sendStatus(404);
        });
    }
});

router.post('/game', auth, (req, res) => {
    let {title, year, price} = req.body;
    if(title == undefined || isNaN(year) || isNaN(price)){
        res.sendStatus(400);
    }else{
        Game.create({
            title:title,
            year:year,
            price:price
        }).then(() => {
            res.statusCode = 200; 
            res.sendStatus(200);
        }).catch(err => {res.sendStatus(400)})
    };
});

router.delete('/game/:id', auth, (req, res) => {
    let id = req.params.id;
    if(isNaN(id)){
        res.sendStatus(400);
    }else{
        Game.destroy({
            where:{id:id}
        }).then(res.sendStatus(200)).catch(err => {
            res.sendStatus(400);
        });
    }
})

router.put('/game/:id', auth, (req, res) => {
    let id = req.params.id;
    if(isNaN(id)) res.sendStatus(400);
    else{
        let {title, year, price} = req.body;
        Game.update({
            title:title,
            year:year,
            price:price
        },{
            where:{id:id}
        }).then(res.sendStatus(200)).catch(err => {res.sendStatus(400)});
    }
});


module.exports = router;