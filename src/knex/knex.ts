import knex, {Knex} from 'knex';
import config from '../knexfile';


const db = knex<Knex>(config['development']);

export default db;