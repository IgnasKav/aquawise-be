import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.PG_HOST,
    port: +process.env.PG_PORT,
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE_NAME,
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/database/migrations/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
