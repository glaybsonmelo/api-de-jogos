const Express = require("express");
const Game = require('./games/Game');
const User = require('./users/User');
const bodyParser = require("body-parser");
const app = Express();
const cors = require('cors');
const userController = require('./users/UserController');
const auth = require("./middlewares/userAuth");
const GameController = require("./games/GameController");

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/', userController);
app.use('/', GameController)


app.listen(8080, () => {
    console.log('Server on');
});