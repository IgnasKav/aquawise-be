import { createDataSourceOptions } from '../data-source';
import { DataSource } from 'typeorm';

const dataSource = new DataSource(createDataSourceOptions());

const tableNames = [
    'order-item',
    'product',
    'order',
    'user',
    'client',
    'company',
    'migrations',
    'advertisements',
];

async function main() {
    await dataSource.initialize();

    for (const table of tableNames) {
        try {
            await dataSource.query(`DROP TABLE "${table}"`);
        } catch {
            continue;
        }
    }
}

main();
