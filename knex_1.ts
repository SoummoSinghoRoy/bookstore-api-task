// import knex, {Knex} from 'knex';
// import config from '../knexfile';


// const db = knex<Knex>(config['development']);

// export default db;


// import type { Knex } from "knex";

// export async function up(knex: Knex): Promise<void> {
//   return knex.schema.createTable('users', (table) => {
//     table.increments('id').primary();
//     table.string('email').notNullable().unique();
//     table.string('password').notNullable();
//     table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
//     table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now());
//   })
// }


// export async function down(knex: Knex): Promise<void> {
//   return knex.schema.dropTableIfExists('users')
// }