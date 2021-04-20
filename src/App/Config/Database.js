import dotenv from 'dotenv';
dotenv.config

const database = {
     mysql : {
          client: process.env.DB_CLIENT,
          connection: {
               host: process.env.DB_HOST,
               user: process.env.DB_USER,
               password: process.env.DB_PASSWORD,
               database: process.env.DB_NAME
          },
          pool: { min: 0, max: 7 },
          acquireConnectionTimeout: 0,
          migrations: {
               tableName: 'migrations'
          }
     }
}

export default database;