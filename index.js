const Express = require("express");
const Game = require('./games/Game');
const User = require('./users/User');
const bodyParser = require("body-parser");
const app = Express();
const cors = require('cors');
const userController = require('./users/UserController');
const auth = require("./middleware/userAuth");


app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/games', auth, (req, res) => {

    res.statusCode = 200;
    Game.findAll().then(games => {
        res.json({games:games, _links:HATEOAS});
    }).catch(err => {res.sendStatus(404)});
});

app.get('/game/:id', auth, (req, res) => {

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

app.post('/game', auth, (req, res) => {
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

app.delete('/game/:id', auth, (req, res) => {
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

app.put('/game/:id', auth, (req, res) => {
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

app.use('/', userController);


app.listen(8080, () => {
    console.log('Server on');
});