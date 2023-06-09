import dataSource from '../data-source';

const tableNames = [
    'order-item',
    'product',
    'order',
    'user',
    'company',
    'migrations',
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
