import { createDataSourceOptions } from '../data-source';
import { DataSource } from 'typeorm';

const dataSource = new DataSource(createDataSourceOptions());

const tableNames = [
    'image',
    'order-item',
    'product',
    'order',
    'user',
    'client',
    'company',
];

async function main() {
    console.log('Dropping tables...');
    await dataSource.initialize();

    for (const table of tableNames) {
        try {
            console.log(`DROP TABLE "${table}"`);
            await dataSource.query(`DROP TABLE "${table}"`);
            console.log(`Suceeded!`);
        } catch {
            console.log(`Failed`);
            continue;
        } finally {
            console.log('+');
        }
    }
}

main();
