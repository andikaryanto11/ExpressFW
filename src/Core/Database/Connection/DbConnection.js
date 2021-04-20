import conn from 'knex';
import database from '../../../App/Config/Database.js';
import dotenv from 'dotenv';
dotenv.config

const DbConnection = conn(database[process.env.DB_CLIENT]);

export default DbConnection;