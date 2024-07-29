"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const knexConfig = {
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
exports.default = knexConfig;
//# sourceMappingURL=knexfile.js.map