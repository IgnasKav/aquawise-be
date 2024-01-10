import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config({ path: `.env` });

export const createDataSourceOptions = (): DataSourceOptions => {
    const isProd = process.env.NODE_ENV === 'prod';

    const dataSourceOptions: DataSourceOptions = {
        type: 'postgres',
        host: process.env.PGHOST, // when calling docker-compose, the variable has to be "postgres-container", when running scripts locally it has to be "localhost"
        port: +process.env.PGPORT,
        username: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE,
        entities: ['dist/**/*.entity.js'],
        migrations: ['dist/database/migrations/*.js'],
        ssl: isProd
            ? {
                  rejectUnauthorized: false,
                  ca: process.env.DO_DATABASE_CERT,
              }
            : null,
    };

    return dataSourceOptions;
};

const dataSource = new DataSource(createDataSourceOptions());
export default dataSource;
