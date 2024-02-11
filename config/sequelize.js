require('dotenv').config();
const Sequelize = require('sequelize');

const {
    DB_USERNAME,
    DB_PASSWORD,
    DB_NAME,
    DB_HOST,
    DB_PORT,
    DB_DIALECT,

} = process.env

//define sequelize configuration
const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DB_DIALECT,
    port: DB_PORT,
    define: {
        timestamps: false,
    },
});

//test the connection
sequelize.
    authenticate()
    .then(() => {
        console.log('Connection to the database has been established successfully');
    })
    .catch((err) => {
        console.log('unable to connect to the database',  err);
    });

module.exports = sequelize;