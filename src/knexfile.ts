import type { Knex } from 'knex';

const knexConfig: { [key: string]: Knex.Config } = {
  development: {
    client: 'mysql2',
    connection: {
      host: "localhost",
      port: 3308,
      user: "root",
      password: "root1234pass",
      database: "bookstore-api-task"
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