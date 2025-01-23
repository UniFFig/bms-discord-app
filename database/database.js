import { Sequelize } from 'sequelize';

const seq = new Sequelize('database', 'user', 'password', {
    dialect: 'sqlite',
    host: 'localhost',
    storage: 'database.sqlite'
});

export default seq;