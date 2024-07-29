import dotenv from 'dotenv';
dotenv.config();

interface EnvVariables {
  db_name: string;
  db_user: string;
  db_password: number | string;
  db_host: string
  db_port: number | string
  secret_key: string;
}

const env_variables: EnvVariables = {
  db_name: process.env.DB_URI || '',
  db_user: process.env.DB_ADMIN || '',
  db_password: process.env.DB_PASSWORD || '',
  db_host: process.env.DB_HOST || '',
  db_port: process.env.DB_PORT || 3306,
  secret_key: process.env.SECRET || '' 
}

export default env_variables;