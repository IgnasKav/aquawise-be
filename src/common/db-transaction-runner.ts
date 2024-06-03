import { DataSource, QueryRunner } from 'typeorm';

const transactionRunner = async (
    dataSource: DataSource,
    callback: (queryRunner: QueryRunner) => Promise<void>,
) => {
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
        await callback(queryRunner);

        await queryRunner.commitTransaction();
    } catch (err) {
        // since we have errors lets rollback the changes we made
        await queryRunner.rollbackTransaction();
        throw err;
    } finally {
        // you need to release a queryRunner which was manually instantiated
        await queryRunner.release();
    }
};

export default transactionRunner;
