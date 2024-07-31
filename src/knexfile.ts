import type { Knex } from 'knex';
import dotenv from 'dotenv';
dotenv.config()

const knexConfig: { [key: string]: Knex.Config } = {
  development: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './knex/migrations'
    },
    seeds: {
      directory: './knex/seeds'
    }
  }
};

export default knexConfig;