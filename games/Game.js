const connection = require('../database/database');
const Sequelize = require('sequelize');

const Game = connection.define('games', {
    title:{
        type: Sequelize.STRING,
        allowNull: true
    },
    year:{
        type: Sequelize.INTEGER,
        allowNull: true
    },
    price:{
        type: Sequelize.FLOAT,
        allowNull: true
    }
});
module.exports = Game;